import requests, json
import flask

def read_overview(name, category):
    url = "https://api.github.com/orgs/" + name
    r = requests.get(url, auth=('SocialCodingCS467','socialcoding123'))
    data = flask.json.loads(r.text)
    file_ptr = open('profile.json', 'w')
    flask.json.dump(data, file_ptr)

def read_language_details_for(name, category):

