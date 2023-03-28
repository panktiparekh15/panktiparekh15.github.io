import pandas as pd
import json

def modify(row):
    js = {}
    js["project_name"] = row[0]
    js["project_category"] = row[1]
    js["project_url"] = row[2]
    js["project_date"] = str(row[3])
    js["thumbnail_img"] = row[4]
    js["banner_img"] = row[5]
    js["tech_stack"] = row[6]
    js["project_description"] = row[7].split("\n")
    return js


data = pd.read_csv("projects.csv")
print(data["project_category"])
data["project_category"] = data["project_category"].fillna("")
data["project_url"] = data["project_url"].fillna("")
data["project_date"] = data["project_date"].fillna("")
data["thumbnail_img"] = data["thumbnail_img"].fillna("")
data["banner_img"] = data["banner_img"].fillna("")
data["tech_stack"] = data["tech_stack"].fillna("")
data["project_description"] = data["project_description"].fillna("")
data = data.values.tolist()
proj = []

for r in data:
    proj.append(modify(r))
   
result = proj
print(result)
with open("projects.json", "w") as f:
    string = json.dumps(result)
    f.writelines(string)

with open("../project-details.html", "r") as f:
    content = f.readlines()    

content = str.join('', content)
output = []
for i in range(0, len(result)):
    project = result[i]
    file = content
    file = file.replace("TITLE_HERE", project["project_name"])
    file = file.replace("CATEGORY_HERE", project["project_category"])
    file = file.replace("TECHSTACK_HERE", project["tech_stack"])
    file = file.replace("IMAGE_HERE", project["banner_img"])
    file = file.replace("PROJECT_DESCRIPTION_HERE", str.join('\n', project["project_description"]))
    file = file.replace("EXCELSHEET_BEFORE", f'{result[(i - 1) % len(result)]["project_url"]}')
    file = file.replace("EXCELSHEET_NEXT", f'{result[(i + 1) % len(result)]["project_url"]}')
    file = file.replace("YEAR_HERE", project["project_date"])
    with open(f'../projects/{project["project_url"]}.html', "w") as f:
        f.writelines(file)
