"""
Pirate scan for cve2012-1823.

Written by Max Hanson, Spring 2021 for my BSU Senior Project.
"""

import nmap


class php_cgi:
    """
    Scan object for cve2012-1823.
    """

    name = "http-vuln-cve2012-1823"
    desc = "Scans for a cve2012-1823."
    oses = "Windows"

    def scan(host_ip):
        """
        Scan for cve2012-1823 with the Pirate Scan API.

        @param host_ip The ip address of the host to scan for the vulnerability
        """

        scanner = nmap.PortScanner()
        scanner.scan(hosts=host_ip, arguments="--script http-vuln-cve2012-1823")

        if not scanner.all_hosts():
            return ("Failure", "No hosts detected.")

        host = scanner.all_hosts()[0]
        if "hostscript" not in scanner[host].keys():
            return ("Success", "Host is not vulnerable to cve2012-1823.")
        else:
            nmap_output = scanner[host]["hostscript"][0]["output"]
            return ("Failure", "Host is vulnerable to cve2012-1823.\n" + nmap_output)
