import json

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

def getResults(file):
    with open(file, "r") as f:
        data = json.load(f)
    return data


def sendResults(file):
    with open(file, "w") as outfile:
        json.dump(file, outfile)
    return outfile

def getTests(file): 
    with open(file, "r") as f:
        tests = json.load(f)
    return tests


def main():
    test = getResults("C:/Users/coleg/OneDrive/Desktop/VisualStudio/CS481/s21-team-blue/backend/testingInfo.json")
    print(test)
    print(sendResults("C:/Users/coleg/OneDrive/Desktop/VisualStudio/CS481/s21-team-blue/backend/testingInfo.json"))
    temp = getTests("C:/Users/coleg/OneDrive/Desktop/VisualStudio/CS481/s21-team-blue/backend/testingInfo.json")
    print(temp)

main()