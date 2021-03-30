"""
Pirate scan for the bluekeep vulnerability (CVE 2019-0708).

Written by Max Hanson, Spring 2021 for my BSU Senior Project.
"""

import subprocess
import os


class bluekeep:
    """
    Scan object for the bluekeep vulnerability (CVE 2019-0708).
    """

    name = "Bluekeep"
    desc = "Scans for the bluekeep vulnerability"
    oses = "Windows"

    def scan (host_ip):
        """
        Scan for the Bluekeep vulnerability according to the Pirate Scan API.

        @param host_ip The ip address of the host to scan for the vulnerability
        """

        scriptpath = os.path.dirname(os.path.realpath(__file__))
        rdpscan_cmd = scriptpath + "/rdpscan"
        output = subprocess.run([rdpscan_cmd, "-v", host_ip], stdout=subprocess.PIPE)
        output = output.stdout
        if "VULNERABLE" in output:
            return ("Failure.", output)
        else:
            return ("Success.", output)
