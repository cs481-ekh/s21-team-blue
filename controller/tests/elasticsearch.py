"""
Pirate scan for cve2015-1427.

Written by Max Hanson, Spring 2021 for my BSU Senior Project.
"""

import nmap


class elasticsearch:
    """
    Scan object for cve2015-1427.
    """

    name = "cve2015-1427"
    desc = "Scans for a cve2015-1427."
    oses = "Windows"

    def scan(host_ip):
        """
        Scan for cve2015-1427 with the Pirate Scan API.

        @param host_ip The ip address of the host to scan for the vulnerability
        """

        scanner = nmap.PortScanner()
        scanner.scan(hosts=host_ip, arguments="--script http-vuln-cve2015-1427")

        if not scanner.all_hosts():
            return ("Failure", "No hosts detected.")

        host = scanner.all_hosts()[0]
        if "hostscript" not in scanner[host].keys():
            return ("Success", "Host is not vulnerable to cve2015-1427.")
        else:
            nmap_output = scanner[host]["hostscript"][0]["output"]
            return ("Failure", "Host is vulnerable to cve2015-1427.\n" + nmap_output)
