import simplejson as json
from flask import redirect
from flask import url_for
from flask import session
from app import app
from flask import render_template
from flask import request
import overview
from test_write_to_file import test_write_to_file
from read_data import read_overview

@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/api/search', methods=['POST'])
def search():
    session.clear()
    search_key = request.form['search_key']
    read_overview(search_key)
    data = overview.main_func(search_key)
    overview_data = json.dumps(data)
    session['overview_data'] = overview_data
    return "success"

#@app.route('/api/language):
#def language():
#    session.clear()
#    language = request.form['language']
#    data = read_language_details_for(language)
#    languages_data = json.dumps(data)
#    session['languages_data'] = languages_data
#    return "success"

@app.route('/api/overview', methods=['GET'])
def api_overview():
    overview_data = session['overview_data']
    return overview_data

@app.route('/overview')
def overview():
    return render_template("overview.html")

@app.route('/start')
def start():
    return render_template("start.html")

@app.route('/contactus')
def contact_us():
    return render_template("contactus.html")

@app.route('/static/json/default_organizations.json', methods=['GET'])
def default_organizations():
    return app.send_static_file('json/default_organizations.json')

