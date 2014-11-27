__author__ = 'madhushrees'

import subprocess
import simplejson as json


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


def get_normalized_followers(json_output_repos,sum_followers):
    for i in range(0,len(json_output_repos)):
        followers=json_output_repos[i]['watchers']
        all_repos_followers.append(followers)
        sum_followers+=followers

    for i in range(0,len(all_repos_followers)):
        normalize_follow = float(all_repos_followers[i]/sum_followers)*10000
        normalize_follow_array.append(normalize_follow)

    return normalize_follow_array


def main_func(org_name,year):
    organisation=org_name
    year=str(year)

    request="https://SocialCodingCS467:socialcoding123@api.github.com/orgs/" + organisation
    json_output=get_json_output(request)

    #Fetch the repository url in an organisation
    repos_url=json_output['repos_url']
    repos_url=repos_url.replace("https://","https://SocialCodingCS467:socialcoding123@")
    json_output_repos = get_json_output(repos_url)


    #Json format
    langugae_json={"repositories" : []}
    normalize_follow_array = get_normalized_followers(json_output_repos,0)
    cnt=0

    #For each repository, fetch the language details, lines of code and number of followers
    for i in range(0,len(json_output_repos)):
        languages=json_output_repos[i]['language']
        full_name=json_output_repos[i]['full_name']
        repo_created_at = json_output_repos[i]['created_at'].split('-')[0]

        if(repo_created_at==year):
            language_url = "https://SocialCodingCS467:socialcoding123@api.github.com/repos/"+full_name+"/"+"languages"
            json_output_languages_list = get_json_output(language_url)
            l =[]
            set_l={}
            sum_languages=0
            for k,v in json_output_languages_list.items():
                x={"name":str(k),"lines":str(v)}
                set_l[k]=1
                sum_languages+=int(v)

            for k,v in json_output_languages_list.items():
                 x={"name":str(k),"lines":int(v/sum_languages*250)}
                 l.append(x)

            langugae_json["repositories"].append({"name":cnt+1, "languages":l,"followers":int(normalize_follow_array[i])})
            cnt+=1


    # file_ptr2 = open("samples/"+organisation+"-languages.json","w")
    # json.dump(langugae_json,file_ptr2)
    # file_ptr2.close()
    print(langugae_json)
    return langugae_json

# main_func("twitter",2010)



