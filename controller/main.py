"""
Placeholder docstsring.
"""


import os
tests = [x[:-3] for x in os.listdir("tests") if x.endswith(".py")]
for test in tests: exec("from scans." + test + " import " + test)


def main():
    """
    Placeholder docstring.
    """
    print("Hello world")


def test_list():
    """
    Retrieve a list of tests as json objects.

    See the README for details on the formatting.
    """

    name = ""
    desc = ""
    oses = ""
    tests = []
    for test_id, test_name in enumerate(tests):
        exec("name = " + test_name + ".name")
        exec("desc = " + test_name + ".desc")
        exec("oses = " + test_name + ".oses")
        test = {
            "test_id": str(test_id),
            "test_name": name,
            "test_description": desc,
            "operating_systems": oses,
        }
        tests.append(test)
    return tests


# Creates the result object in JSON format
def create_json_result(res_id, test_id, desc, date, val):
    return {
        "id": str(res_id),
        "test_id": str(test_id),
        "description": desc,
        "date": date.strftime("%b %d %Y %H:%M:%S"),
        "value" : val
    }

# Mapping of Test IDs to functions
def run_test(id, ip, idx):
    val = tests[id](ip)

# Loop through all of the Test IDs, run the corresponding tests, and return the results
def execute_tests(ip, tests):
    results = []
    idx = 0
    for id in tests:
        results.append(run_test(int(id), ip, idx))
        idx += 1
    return results

if __name__ == "__main__":
    main()
