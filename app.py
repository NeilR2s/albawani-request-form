'''
i need a simple form in flask. starting date and ending  and a submit button.
 validation: ending date must be equal or greater than starting date. 
 date format in dd-mm-yyyy. submit button will save the request to sqlite3 database.
'''
from datetime import date, datetime
from flask import Flask, render_template
from pydantic import BaseModel, Field
from db import get_db_session, set_db_tables
# TODO: implement app constuctor once requirements become clear
app = Flask(__name__)

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

@app.route("/create-form", methods=["POST"])
def create_form():
    pass

@app.route("/view-form", methods=["GET"])
def view_form():
    pass

@app.route("/submit-form", methods=["POST"])
def submit_form():
    pass

if __name__ == "__main__":
    set_db_tables()
    app.run(debug=True, port=5000)