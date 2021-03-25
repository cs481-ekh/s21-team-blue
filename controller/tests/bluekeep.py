"""
Pirate scan for the bluekeep vulnerability (CVE 2019-0708).

Written by Max Hanson, Spring 2021 for my BSU Senior Project.
"""


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

        return ("Failure", "Test not implemented.")
