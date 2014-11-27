import subprocess
import simplejson as json

def get_json_output(request):
    #Fetch repos url to check the language for each repository
    process = subprocess.Popen(["curl", "-H", "POST", request],stdout=subprocess.PIPE)
    (out, err) = process.communicate()

    json_output_repos = json.loads(out)
    return json_output_repos


def get_json_repo_output(request):
    #Fetch repos url to check the language for each repository
    json_list = []
    for j in range(1, 10):
        new_request = request + "?page=" + str(j)
        process = subprocess.Popen(["curl", "-H", "POST", new_request],stdout=subprocess.PIPE)
        (out, err) = process.communicate()
        json_output_repos = json.loads(out)
        if not json_output_repos:
            break
        elif j == 1:
            json_list = json_output_repos
        elif j > 1:
            json_list += json_output_repos
    return json_list


# organisation="twitter"
def main_func(organisation):
    print(organisation)
    request="https://SocialCodingCS467:socialcoding123@api.github.com/orgs/" + organisation
    json_output=get_json_output(request)

    #Fetch the repository url in an organisation
    repos_url=json_output['repos_url']
    repos_url=repos_url.replace("https://","https://SocialCodingCS467:socialcoding123@")
    json_output_repos = get_json_repo_output(repos_url)

    year_2008 = {}
    year_2009 = {}
    year_2010 = {}
    year_2011 = {}
    year_2012 = {}
    year_2013 = {}
    year_2014 = {}

    #For each repository, fetch the language details, lines of code and number of followers
    for i in range(0,len(json_output_repos)):
        full_name=json_output_repos[i]['full_name']
        repo_created_at = json_output_repos[i]['created_at'].split('-')[0]

        language_url = "https://SocialCodingCS467:socialcoding123@api.github.com/repos/"+full_name+"/"+"languages"
        json_output_languages_dict = get_json_output(language_url)

        if repo_created_at == "2008":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2008.keys():
                    year_2008[each_lang] += 1
                else:
                    year_2008[each_lang] = 1

        if repo_created_at == "2009":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2009.keys():
                    year_2009[each_lang] += 1
                else:
                    year_2009[each_lang] = 1

        if repo_created_at == "2010":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2010.keys():
                    year_2010[each_lang] += 1
                else:
                    year_2010[each_lang] = 1

        if repo_created_at == "2011":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2011.keys():
                    year_2011[each_lang] += 1
                else:
                    year_2011[each_lang] = 1


        if repo_created_at == "2012":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2012.keys():
                    year_2012[each_lang] += 1
                else:
                    year_2012[each_lang] = 1

        if repo_created_at == "2013":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2013.keys():
                    year_2013[each_lang] += 1
                else:
                    year_2013[each_lang] = 1

        if repo_created_at == "2014":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2014.keys():
                    year_2014[each_lang] += 1
                else:
                    year_2014[each_lang] = 1


    total_lang = year_2008.keys() + year_2009.keys() + year_2010.keys() + year_2011.keys() + year_2012.keys() + year_2013.keys() + year_2014.keys()
    total_lang = list(set(total_lang))

    total_years = {}
    final_json = {}
    years = [2008, 2009, 2010, 2011, 2012, 2013, 2014]

    total_years["2008"] = year_2008
    total_years["2009"] = year_2009
    total_years["2010"] = year_2010
    total_years["2011"] = year_2011
    total_years["2012"] = year_2012
    total_years["2013"] = year_2013
    total_years["2014"] = year_2014

    final_json["years"] = years
    final_json["languages"] = total_lang
    final_json["details"] = total_years

    #file_ptr2 = open("samples/"+organisation+"-overview.json","w")
    #json.dump(final_json,file_ptr2)
    #file_ptr2.close()

    return final_json
