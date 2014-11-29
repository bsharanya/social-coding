import requests
import flask


def read_details(url):
    r = requests.get(url, auth=('SocialCodingCS467', 'socialcoding123'))
    data = r.json()
    i = 2
    while len(r.json()) != 0:
        r = requests.get(url + "?page=" + str(i), auth=('SocialCodingCS467', 'socialcoding123'))
        data.extend(r.json())
        i += 1

    for repo in data:
        url = repo["languages_url"]
        r = requests.get(url, auth=('SocialCodingCS467', 'socialcoding123'))
        repo["languages"] = r.json()

    file_ptr = open('repos.json', 'w')
    flask.json.dump(data, file_ptr)


def read_overview(name):
    url = "https://api.github.com/users/" + name
    r = requests.get(url, auth=('SocialCodingCS467', 'socialcoding123'))
    data = flask.json.loads(r.text)
    file_ptr = open('profile.json', 'w')
    flask.json.dump(data, file_ptr)

    read_details(data["repos_url"])