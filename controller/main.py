"""
Main file for the test controller.

This file is responsible for enumerating the tests located in the 'scans' subdirectory and providing access.
This file can be run manually, run it with '--help' for usage.
This file can also be automated. Use the 'test_list()' function to get a list of tests to run, and use the
execute_tests function to run the tests and receive the results.

Written by Max Hanson, Spring 2021 for my BSU Senior Project.
"""


from datetime import datetime
import os
import sys
import json

# import every '.py' in the 'scans' directory and record its name in 'tests' as a string
dir = os.path.dirname(__file__) # Get the current directory of this file
tests = [x[:-3] for x in os.listdir(os.path.join(dir,"tests")) if x.endswith(".py")]
tests.remove("__init__") # __init__ is not a scan!
for test in tests: exec("from tests." + test + " import " + test)

# these globals are needed for the test_list function because of how exec() works
name = ""
desc = ""
oses = ""

test_val = ""
test_desc = ""
ip = ""

def main():
    """
    Manually run tests and view the results.

    Run this file with the '--help' flag to see the usage guide.
    """

    args = sys.argv[1:] # ignore the filename arg

    if not args or args[0] == "--help":
        print("Manual scanning:")
        print("    --list: Print out a list of runnable tests")
        print("    --ip ip_addr test_id0 test_id1 ...: Scan the host at ip_addr with tests id0, id1, ... and print the results")
    elif args[0] == "--list":
        list = '[' # Brackets required for proper JSON object formatting
        for test in test_list():
            list += json.dumps(test) + ','        
        list = list[:-1] # Remove the last comma
        list += ']'
        print(list)
    elif args[0] == "--ip":
        ip = args[1]
        test_ids = args[2].split(',')
        results = execute_tests(ip, test_ids) # Execute the tests and store the results
        print(json.dumps(results))


def test_list():
    """
    Retrieve a list of tests as json objects.

    See the README for details on the formatting.
    """

    test_json_objs = []
    for test_id, test_name in enumerate(tests):
        exec("name = "+test_name+".name", globals())
        exec("desc = "+test_name+".desc", globals())
        exec("oses = "+test_name+".oses", globals())
        test = {
            "test_id": str(test_id),
            "test_name": name,
            "test_description": desc,
            "operating_systems": oses,
        }
        test_json_objs.append(test)
    return test_json_objs


def execute_tests(ip, test_ids):
    """
    Execute a list of tests and return a list of json results.

    See the README for details on the format of the json results.

    @param ip The ip address of the host to scan
    @param test_ids A list of ids of tests to run, must correspond to ids returned by test_list()
    """

    results = []
    for result_id, test_id in enumerate(test_ids):
        test_name = tests[int(test_id)]
        exec("test_val, test_desc = " + test_name + ".scan('" + ip + "')", globals())
        test_result = {
            "id": str(result_id+1),
            "test_id": str(test_id),
            "value": test_val,
            "description": test_desc,
            "date": datetime.now().strftime("%b %d %Y %H:%M:%S"),
        }
        results.append(test_result)
    return results


if __name__ == "__main__":
    main()
