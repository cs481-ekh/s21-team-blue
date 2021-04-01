"""
Pirate scan for .

Written by Max Hanson, Spring 2021 for my BSU Senior Project.
"""

import nmap


class php_cgi:
    """
    Scan object for .
    """

    name = ""
    desc = "Scans for a ."
    oses = "Windows"

    def scan(host_ip):
        """
        Scan for cve2015-1635 with the Pirate Scan API.

        @param host_ip The ip address of the host to scan for the vulnerability
        """

        scanner = nmap.PortScanner()
        scanner.scan(hosts=host_ip, arguments="--script http-vuln-cve2012-1823")

        if not scanner.all_hosts():
            return ("Failure", "No hosts detected.")

        host = scanner.all_hosts()[0]
        if "hostscript" not in scanner[host].keys():
            return ("Success", "Host is not vulnerable to .")
        else:
            nmap_output = scanner[host]["hostscript"][0]["output"]
            return ("Failure", "Host is vulnerable to .\n" + nmap_output)
