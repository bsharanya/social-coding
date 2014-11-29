import simplejson as json
from flask import redirect
from flask import url_for
from flask import session
from app import app
from flask import render_template
from flask import request
import org_overview
from test_write_to_file import test_write_to_file
from read_data import read_overview
from read_data import read_language_details_for
import org_profile
import org_year


@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/api/search', methods=['POST'])
def search():
    #session.clear()
    search_key = request.form['search_key']
    read_overview(search_key)
    data = org_overview.main_func()
    profile = org_profile.main_func()
    #print(profile)
    overview_data = json.dumps(data)
    profile_data = json.dumps(profile)
    session['overview_data'] = overview_data
    session['profile_data']=profile_data
    return "success"


@app.route('/api/year', methods=['POST'])
def api_year():
    #session.clear()
    year = request.form['year']
    print(year)
    data1,data2 = org_year.main_func(year)
    profile = org_profile.main_func()
    year_data = json.dumps(data1)
    color_data = json.dumps(data2)
    profile_data = json.dumps(profile)
    print(year_data)
    session['year_data'] = year_data
    session['color_data'] = color_data
    session['profile_data']=profile_data

    return "success"

@app.route('/api/year/details', methods=['GET'])
def year_details():
    year_data = session['year_data']
    return year_data

@app.route('/api/color/details', methods=['GET'])
def year_details():
    color_data = session['color_data']
    return color_data

@app.route('/year')
def year():
    data = session['profile_data']
    profile = json.loads(data)
    return render_template("year.html", profile=profile)

@app.route('/api/language', methods=['POST'])
def api_language():
    #session.clear()
    language = request.form['language']
    data = read_language_details_for(language)
    profile = org_profile.main_func()
    languages_data = json.dumps(data)
    profile_data = json.dumps(profile)
    session['languages_data'] = languages_data
    session['profile_data']=profile_data
    return "success"

@app.route('/api/language/details')
def language_details():
    languages_data = session['languages_data']
    print(languages_data)
    return languages_data

@app.route('/language')
def language():
    data = session['profile_data']
    profile = json.loads(data)
    return render_template("language.html",profile=profile)

@app.route('/api/overview', methods=['GET'])
def api_overview():
    overview_data = session['overview_data']
    return overview_data

@app.route('/overview')
def overview():
    data = session['profile_data']
    profile = json.loads(data)
    return render_template("overview.html", profile=profile)

@app.route('/start')
def start():
    return render_template("start.html")

@app.route('/contactus')
def contact_us():
    return render_template("contactus.html")

@app.route('/static/json/default_organizations.json', methods=['GET'])
def default_organizations():
    return app.send_static_file('json/default_organizations.json')

