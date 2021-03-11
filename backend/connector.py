import json
import os
from splitTests import dictRules
from splitTests import UniformDictList

# Easier to just write tests selected to a file?
# Unsure how to grab the array from json class currently, so this is what I've got

# Basic json array to test things with
data = {}
data['testInfo'] = []
data['testInfo'].append({
    'id': 1,
    'test_id': 7,
    'description': "1000 ports scanned, 0 open",
    'data': "2021-03-10",
    'value': "Success"
})
data['testInfo'].append({
    'id': 2,
    'test_id': 8,
    'description': "1001 ports scanned, 0 open",
    'data': "2021-03-10",
    'value': "Failure"
})

def sendResults(file):
    cwd = os.getcwd()
    writepath = cwd + "\\backend\\results.json"
    mode = 'a+' if os.path.exists(writepath) else 'w+'
    with open(file, "r") as f:
        data = json.load(f)
    with open(writepath, mode) as outfile:
        json.dump(data, outfile, indent=2)
        outfile.write('\n')
    return writepath

def getTests(file): 
    with open(file, "r") as f:
        tests = UniformDictList(json.load(f))
    listOfTests = tests[:][:]
    return listOfTests


def main():
    cwd = os.getcwd()
    print(sendResults(cwd + "\\backend\\testingInfo.json"))
    temp = getTests(cwd + "\\backend\\testingInfo.json")
    print(temp)

main()