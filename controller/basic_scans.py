"""
Performs basic scans on a given host.
"""

import json
from datetime import datetime
import nmap
import sys

def eternal_blue_scan(test_id, host_ip, res_id):

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

if __name__ == "__main__":
    args = sys.argv[1:] # Ignore the filename argument
    if args[0] == "get-test-list":
        print(json.dumps(test_list()))
        exit(0)
    ip = args[0] # Grab the IP address
    test_ids = args[1].split(',') # Store the list of Test IDs as an array
    results = execute_tests(ip, test_ids) # Execute the tests and store the results
    print(json.dumps(results))
