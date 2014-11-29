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


def read_language_details_for(language):
    file_ptr = open('repos.json', 'r')
    repos = flask.json.load(file_ptr)

    data = {"language": language,
            "years": {"2008": {"repos": []}, "2009": {"repos": []}, "2010": {"repos": []}, "2011": {"repos": []},
                      "2012": {"repos": []}, "2013": {"repos": []}, "2014": {"repos": []}}}

    year_normalization = {"2008": {"total": 0, "language": 0}, "2009": {"total": 0, "language": 0},
                          "2010": {"total": 0, "language": 0}, "2011": {"total": 0, "language": 0},
                          "2012": {"total": 0, "language": 0}, "2013": {"total": 0, "language": 0},
                          "2014": {"total": 0, "language": 0}}

    for repo in repos:
        year = repo["created_at"].split("-")[0]
        year_normalization[year]["total"] += 1
        if language in repo["languages"]:
            repo_details = {"name": repo["full_name"], "repo_url": repo["html_url"],
                            "profile_url": repo["owner"]["html_url"]}
            data["years"][year]["repos"].append(repo_details)
            year_normalization[year]["language"] += 1

    width = 80
    for year in year_normalization:
        language_count = year_normalization[year]["language"]
        total_count = year_normalization[year]["total"]

        if language_count != 0 and total_count != 0:
            ratio = float(language_count)/total_count
        else:
            ratio = 0
        data["years"][year]["ratio"] = int(ratio * width)

    return data
