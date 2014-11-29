__author__ = 'madhushrees'


import subprocess
import simplejson as json
import flask


sum_followers=0
all_repos_followers=[]
normalize_follow=0
normalize_follow_array=[]

def get_json_output(request):
    #Fetch repos url to check the language for each repository
    process = subprocess.Popen(["curl", "-H", "POST", request],stdout=subprocess.PIPE)
    (out, err) = process.communicate()

    json_output_repos = json.loads(out)
    return json_output_repos

def get_json_repo_output(request):
    #Fetch repos url to check the language for each repository
    json_list = []
    for j in range(1, 50):
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


def get_normalized_followers(json_output_repos,sum_followers):
    for i in range(0,len(json_output_repos)):
        followers=json_output_repos[i]['watchers']
        all_repos_followers.append(followers)
        sum_followers+=followers

    for i in range(0,len(all_repos_followers)):
        normalize_follow = int(float(all_repos_followers[i])/sum_followers*10000)
        normalize_follow_array.append(normalize_follow)

    return normalize_follow_array


def main_func(year):
    year=str(year)
    file_ptr=open("repos.json","r")
    json_output_repos = flask.json.load(file_ptr)

    #Json format
    langugae_json={"year" : year, "repositories" : []}
    normalize_follow_array = get_normalized_followers(json_output_repos,0)
    cnt=0

    #For each repository, fetch the language details, lines of code and number of followers
    for i in range(0,len(json_output_repos)):
        full_name=json_output_repos[i]['full_name']
        repo_created_at = json_output_repos[i]['created_at'].split('-')[0]

        if(repo_created_at==year):
            json_output_languages_dict = json_output_repos[i]['languages']
            #print(json_output_languages_dict)
            l =[]
            set_l={}
            sum_languages=0
            for k,v in json_output_languages_dict.items():
                x={"name":str(k),"lines":str(v)}
                set_l[k]=1
                sum_languages+=int(v)

            for k,v in json_output_languages_dict.items():
                 x={"name":str(k),"lines":int(float(v)/sum_languages*250)}
                 l.append(x)
            print(l)

            langugae_json["repositories"].append({"name":cnt+1, "languages":l,"followers":int(normalize_follow_array[i])})
            cnt+=1

    #print(langugae_json)
    file_ptr.close()
    return langugae_json

#main_func(2010)



