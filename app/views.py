from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/start')
def start():
    return render_template("start.html")

@app.route('/contactus')
def contact_us():
    return render_template("contactus.html")