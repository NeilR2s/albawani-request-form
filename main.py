from datetime import datetime
import logging

from flask import Flask, render_template, request, jsonify, url_for, redirect, session
from flask_session import Session
from flask_cors import CORS

from auth import build_msal_app, login_required
from config import settings
from db import get_db_session, set_db_tables, FormData as DBFormData

# TODO: implement fancy logger constructor
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S', 
    filename='app.log',
    filemode='a'
)
logger = logging.getLogger()

logger.info("setting up middleware")

app = Flask(__name__)
app.secret_key = settings.SECRET_KEY
app.config["SESSION_TYPE"] = settings.SESSION_TYPE
CORS(app)
Session(app)


@app.route("/", methods=["GET"])
def render_home_page():
    return render_template("index.html")

@app.route("/login")
def login():
    msal_app = build_msal_app()

    auth_url = msal_app.get_authorization_request_url(
        scopes=settings.SCOPE,
        redirect_uri=url_for("auth_callback", _external=True)
    )
    return redirect(auth_url)

@app.route("/auth/callback")
def auth_callback():
    code = request.args.get("code")

    msal_app = build_msal_app()
    result = msal_app.acquire_token_by_authorization_code(
        code=code,
        scopes=settings.SCOPE,
        redirect_uri=url_for("auth_callback", _external=True),
    )

    if "id_token_claims" in result:
        session["user"] = result["id_token_claims"]
        return redirect(url_for("render_home_page"))

    return "Authentication failed", 401
    

@app.route("/attendance", methods=["GET"])
@login_required
def render_attendees_page():
    return render_template("attendance.html")

@app.route("/employees", methods=["GET"])
@login_required
def render_employees_page():
    return render_template("employees.html")

@app.route("/request-attendance", methods=["POST"])
@login_required
def create_form():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    try:
        data=request.get_json()
        logger.info(f"request-attendance endpoint response:\n{data} ")
        with get_db_session() as db_session:
            database_object = DBFormData(
                start_date=datetime.fromisoformat(data.get("startDate")).date(),
                end_date=datetime.fromisoformat(data.get("endDate")).date(),
                message="raw client data"
            )
            db_session.add(database_object)

            logger.info(f"Committed object to FormData table \n {database_object}")
        return jsonify({"message": "Hello from Flask server!"}), 200

    except Exception as e:
        logger.error(e)
        return jsonify({"error": f"Invalid JSON format: {str(e)}"}), 400


if __name__ == "__main__":
    set_db_tables()
    app.run(debug=True, port=8000)