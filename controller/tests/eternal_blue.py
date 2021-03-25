"""
Pirate scan for the eternal blue vulnerability (CVE MS17-010).

Written by Max Hanson, Spring 2021 for my BSU Senior Project.
"""

import nmap


class eternal_blue:
    """
    Scan object for the eternal blue vulnerability (CVE MS17-010).
    """

    name = "Eternal Blue"
    desc = "Scans for the eternal blue vulnerability"
    oses = "Windows"

    def scan (host_ip):
        """
        Scan for the Eternal Blue vulnerability according to the Pirate Scan API.

        @param host_ip The ip address of the host to scan for the vulnerability
        """

        scanner = nmap.PortScanner()
        scanner.scan(hosts=host_ip, ports="445", arguments="--script smb-vuln-ms17-010")

        if not scanner.all_hosts():
            return "Failure. No hosts detected."

        host = scanner.all_hosts()[0]
        if "hostscript" not in scanner[host].keys():
            return "Success. Host is not vulnerable to Eternal Blue (CVE MS17-010)."
        else:
            nmap_output = scanner[host]["hostscript"][0]["output"]
            return "Failure. Host is vulnerable to Eternal Blue (CVE MS17-010).\n" + nmap_output
