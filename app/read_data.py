import requests
import flask
import numpy as np
from scipy import stats


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
            "max": 0,
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

    max = 0
    width = 80
    for year in year_normalization:
        language_count = year_normalization[year]["language"]
        if language_count > max:
            max = language_count
        total_count = year_normalization[year]["total"]

        if language_count != 0 and total_count != 0:
            ratio = float(language_count)/total_count
        else:
            ratio = 0
        data["years"][year]["ratio"] = int(ratio * width)

    data["max"] = max

    return data


def normalize_followers(followers_list, watcher):

    sum = 0
    normalize = 0
    if watcher != 0 and len(followers_list) != 0:
        new_array = np.array(followers_list)
        new_array = stats.zscore(new_array)
        given_mean = np.mean(new_array)

        given_length = len(followers_list)

        normalize_array = []
        for i in range(0,len(followers_list)):
            sum += (followers_list[i] - given_mean)

        attr_sum = float(sum)/given_length

        normalize = (float(watcher - given_mean)/attr_sum) * 500

    return normalize


def normalize_language_lines_count(lines_language, lang_len, total):
    new_measure = 245 - (lang_len*5)
    norm_line = float(lines_language)*new_measure/total
    return norm_line

#this is for year wise view
def read_year_details(year):
    file_ptr = open('repos.json', 'r')
    repos = flask.json.load(file_ptr)

    color_ptr = open('color.json', 'r')
    colors_map = flask.json.load(color_ptr)

    languages_in_year = set()
    repositories_json = {"repositories": []}

    followers = []
    for repo in repos:
        repo_details = repo
        this_year = repo_details["created_at"].split("-")[0]
        if year == this_year:
            followers.append(repo_details["watchers"])

    i = 1
    for repo in repos:
        repo_details = repo
        this_year = repo_details["created_at"].split("-")[0]
        if year == this_year:
            details = {"repository_url": repo_details["html_url"], "repository_name": repo_details["full_name"],
                       "name": i, "languages": []}

            details["followers"] = normalize_followers(followers, repo_details["watchers"])
            if len(repo_details["languages"]) == 0:
                if repo_details["language"] is not None:
                    language = repo_details["language"]
                    language_details = {"name": language, "lines": 245}
                    if language in colors_map:
                        color = colors_map[language]
                    else:
                        color = "#000000"
                    language_details["color"] = color
                    details["languages"].append(language_details)
                    languages_in_year.add(language)
            else:
                language_s = set()
                total_number_of_lines = 0
                for language in repo_details["languages"]:
                    language_s.add(language)
                    total_number_of_lines += repo_details["languages"][language]
                    languages_in_year.add(language)

                language_s = sorted(language_s)
                for language in language_s:
                    language_details = {"name": language}
                    if language in colors_map:
                        color = colors_map[language]
                    else:
                        color = "#000000"
                    language_details["color"] = color
                    length_of_language = len(language_s)
                    lines_for_language = repo_details["languages"][language]
                    lines = normalize_language_lines_count(lines_for_language, length_of_language, total_number_of_lines)
                    language_details["lines"] = lines
                    details["languages"].append(language_details)

            repositories_json["repositories"].append(details)
            i += 1

    languages_in_year = sorted(languages_in_year)
    colors_json = {"colors": []}
    for language in languages_in_year:
        if language in colors_map:
            color = colors_map[language]
        else:
            color = "#000000"
        colors_json["colors"].append({"lang": language, "color": color})

    repositories_json["year"] = year
    return repositories_json, colors_json
