'''
i need a simple form in flask. starting date and ending  and a submit button.
 validation: ending date must be equal or greater than starting date. 
 date format in dd-mm-yyyy. submit button will save the request to sqlite3 database.
'''
from datetime import date, datetime
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from pydantic import BaseModel, Field
from db import get_db_session, set_db_tables, FormData as DBFormData
import logging

# TODO: implement app constuctor once requirements become clear
app = Flask(__name__)
CORS(app)

# TODO: implement fancy logger constructor
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S', 
    filename='app.log',
    filemode='a'
)
logger = logging.getLogger()

class FormData(BaseModel):

    start_date:date = Field(default=None)
    end_date:date = Field(default=None)
    message:str = Field(default=None)


@app.route("/", methods=["GET"])
def render_home_page():
    return render_template("index.html")

@app.route("/attendance", methods=["GET"])
def render_attendees_page():
    return render_template("attendance.html")

@app.route("/employees", methods=["GET"])
def render_employees_page():
    return render_template("employees.html")

@app.route("/request-attendance", methods=["POST"])
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
        return jsonify({"error": f"Invalid JSON format: {str(e)}"}), 400
        logger.error(e)


if __name__ == "__main__":
    set_db_tables()
    app.run(debug=True, port=5000)