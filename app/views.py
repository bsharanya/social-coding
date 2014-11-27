from app import app
from flask import render_template
from flask import request

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

@app.route('/api/search', methods=['POST'])
def search():
    search_key = request.form['search_key']
    return search_key

@app.route('/static/json/default_organizations.json', methods=['GET'])
def default_organizations():
    return app.send_static_file('json/default_organizations.json')

