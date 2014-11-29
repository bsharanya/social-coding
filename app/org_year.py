__author__ = 'madhushrees'


import subprocess
import simplejson as json
import flask


sum_followers=0
all_repos_followers=[]
normalize_follow=0
normalize_follow_array=[]


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
    color_ptr=open("color.json","r")
    color_dict=flask.json.load(color_ptr)
    color_ptr.close()
    file_ptr=open("repos.json","r")
    json_output_repos = flask.json.load(file_ptr)
    file_ptr.close()

    color_json = {"colors" : []}

    lang_list = []
    #Json format
    langugae_json={"year" : year, "repositories" : []}
    normalize_follow_array = get_normalized_followers(json_output_repos,0)
    cnt=0

    #For each repository, fetch the language details, lines of code and number of followers
    for i in range(0,len(json_output_repos)):
        full_name=json_output_repos[i]['full_name']
        repo_url =json_output_repos[i]['html_url']
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
                lang_list.append(k)
                color = color_dict.get(k)
                color_json[k] = str(color)
                x={"name":str(k),"lines":int(float(v)/sum_languages*250), "color":str(color)}
                l.append(x)
            #print(l)

            langugae_json["repositories"].append({"name":cnt+1,"repository_name": full_name, "repository_url" :repo_url, "languages":l,"followers":int(normalize_follow_array[i])})
            cnt+=1


    lang_list = list(set(lang_list))
    for each_lang in lang_list:
        color = color_dict.get(each_lang)
        color_json["colors"].append({"lang":each_lang, "color":color})

    #print(color_json)
    file_ptr.close()
    return langugae_json, color_json

#main_func(2010)



