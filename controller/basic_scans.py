"""
Performs basic scans on a given host.
"""

import json
from datetime import datetime
import nmap


def run_basic_scans(host_ip):
    """
    Runs basic scans on a given host.
    """

    date = datetime.now()

    port_scan_result = {
        "test": {
            "id": "testid",
            "name": "tcp port scan",
            "description": "a scan of all tcp ports",
            "operating_systems": ["windows", "linux", "osx"]
            },
        "results": {
            "id": "testid",
            "test_id": "test test_id",
            "description": "a scan of all tcp ports",
            "date": str(date),
            },
        }
    port_scan_result["results"]["value"] = port_scan(host_ip)

    basic_scans_result = {
        "port_scan": port_scan_result,
        }

    return json.dumps(basic_scans_result)

def port_scan(host_ip):
    """
    Scans all TCP ports on a given host.
    """

    # all TCP ports
    #port_range = "0-65535"
    port_range = "21-443"
    protocol = "tcp"

    scanner = nmap.PortScanner()
    scanner.scan(host_ip, port_range)

    # return if there are no detected hosts
    if not scanner.all_hosts():
        return []
    # return if there are no tcp ports dectected
    host = scanner.all_hosts()[0]
    if "tcp" not in scanner[host].all_protocols():
        return []

    open_ports = {}
    scanned_ports = scanner[host][protocol].keys()
    for port in scanned_ports:
        port_name = scanner[host][protocol][port]["name"]
        port_prod = scanner[host][protocol][port]["product"]
        open_ports[port] = port_name + ", " + port_prod

    return open_ports

if __name__ == "__main__":
    ip = input()
    print(run_basic_scans(ip))
