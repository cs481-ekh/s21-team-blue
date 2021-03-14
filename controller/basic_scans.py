"""
Performs basic scans on a given host.
"""

import json
from datetime import datetime
import nmap
import sys

# A list of all available tests. Update every time
# a new test is created.
def test_list():
    tests = []
    tests.append(create_json_test(1,"Nmap Port Scan", "Common port scan", "Any"))
    return tests

def create_json_test(id, name, desc, os_list):
    return {
        "test_id": str(id),
        "test_name": name,
        "test_description": desc,
        "operating_systems": os_list,
    }

# Creates the result object in JSON format
def create_json_result(res_id, test_id, desc, date, val):
    return {
        "id": str(res_id),
        "test_id": str(test_id),
        "description": desc,
        "date": date.strftime("%b %d %Y %H:%M:%S"),
        "value" : val
    }

def eternal_blue_scan(test_id, host_ip, res_id):
    date = datetime.now()
    val = ""
    desc = ""

    scanner = nmap.PortScanner()
    scanner.scan(hosts=host_ip, ports="445", arguments="--script smb-vuln-ms17-010")

    if not scanner.all_hosts():
        desc = "No hosts detected"
        val = "Info"
        return create_json_result(res_id, test_id, desc, date, val)

    host = scanner.all_hosts()[0]
    if "hostscript" not in scanner[host].keys():
        desc = "Host is secure."
        val = "Success"
    else:
        desc = """Host is vulnerable!
===Nmap Output===
""" + scanner[host]["hostscript"][0]["output"]
        val = "Failure"
    return create_json_result(res_id, test_id, desc, date, val)

def basic_port_scan(test_id, host_ip, res_id):
    return port_scan(test_id, host_ip, res_id, "21-443")

def full_port_scan(test_id, host_ip, res_id):
    return port_scan(test_id, host_ip, res_id, "0-65535")

def port_scan(test_id, host_ip, res_id, port_range):
    date = datetime.now()
    val = ""
    desc = ""
    protocol = "tcp"

    scanner = nmap.PortScanner()
    scanner.scan(host_ip, port_range)

    # return if there are no detected hosts
    if not scanner.all_hosts():
        desc = "No hosts detected"
        val = "Info"
        return create_json_result(res_id, test_id, desc, date, val)

    # return if there are no tcp ports dectected
    host = scanner.all_hosts()[0]
    if "tcp" not in scanner[host].all_protocols():
        desc = "No open TCP ports found"
        val = "Info"
        return create_json_result(res_id, test_id, desc, date, val)

    open_ports = {}
    scanned_ports = scanner[host][protocol].keys()
    for port in scanned_ports:
        port_name = scanner[host][protocol][port]["name"]
        port_prod = scanner[host][protocol][port]["product"]
        open_ports[port] = port_name + ", " + port_prod

    desc = str(open_ports)
    val = "Success"
    return create_json_result(res_id,test_id,desc,date,val)

# Mapping of Test IDs to functions
def run_test(id, ip, idx):
    tests = {
        1: basic_port_scan(1, ip, idx),
        2: full_port_scan(2, ip, idx),
        3: eternal_blue_scan(2, ip, idx),
    }
    return tests.get(id, "ERROR: Could not find a test with the given ID")

# Loop through all of the Test IDs, run the corresponding tests, and return the results
def execute_tests(ip, tests):
    results = []
    idx = 0
    for id in tests:
        results.append(run_test(int(id), ip, idx))
        idx += 1
    return results

if __name__ == "__main__":
    args = sys.argv[1:] # Ignore the filename argument
    if args[0] == "get-test-list":
        print(json.dumps(test_list()))
        exit(0)
    ip = args[0] # Grab the IP address
    test_ids = args[1].split(',') # Store the list of Test IDs as an array
    #print("test_ids: " + str(test_ids))
    results = execute_tests(ip, test_ids) # Execute the tests and store the results
    print(json.dumps(results))
