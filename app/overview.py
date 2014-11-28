import sys
import subprocess
import simplejson as json

#organisation = sys.argv[1]

def get_json_output(request):
    #Fetch repos url to check the language for each repository
    process = subprocess.Popen(["curl", "-H", "POST",  request],stdout=subprocess.PIPE)
    (out, err) = process.communicate()

    json_output_repos = json.loads(out)
    return json_output_repos


organisation=sys.argv[1]

request="https://api.github.com/orgs/" + organisation

json_output=get_json_output(request)

name=json_output['name']
created_at=json_output['created_at']
html_url=json_output['html_url']
image = json_output['avatar_url']
followers=json_output['followers']
no_of_public_repos = json_output['public_repos']

#Fetch all the repositories of an organisation
repos_url=json_output['repos_url']
json_output_repos = get_json_output(repos_url)

#Add  all the languages to set: no duplication
languages_set = set([])
for i in range(0,len(json_output_repos)):
    languages=json_output_repos[i]['language']
    languages_set.add(languages)

#Create json for overview left pane
org_json = {"overview" : { "name": name, "created_at": created_at, "html_url": html_url, "avatar_url": image, "languages": []}}

for item in languages_set:
     org_json["overview"]["languages"].append(item)

file_ptr = open(name+".json", "w")
json.dump(org_json, file_ptr)
file_ptr.close()



