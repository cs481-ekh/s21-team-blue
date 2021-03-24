"""
Pirate scan for all TCP ports (0-65535).

Written by Max Hanson, Spring 2021 for my BSU Senior Project.
"""

import nmap


class full_port_scan:
    """
    Pirate scan object for all TCP ports (0-65535).
    """

    name = "Full Port Scan"
    desc = "Scan TCP ports 0-65535 and interrogate those open ports for the services running on them."
    oses = "Any"

    def scan(host_ip):
        """
        Scan all TCP ports (0-65535) and determine if they are open.
        If they are open, they are interrogated for the services running on those ports.

        @param host_ip The ip address of the host to scan
        """

        scanner = nmap.PortScanner()
        scanner.scan(host_ip, "0-65535")

        if not scanner.all_hosts():
            return "Failure. Host cannot be found."

        host = scanner.all_hosts()[0]
        if "tcp" not in scanner[host].all_protocols():
            return "Success. No open TCP ports found on host."

        open_ports = {}
        scanned_ports = scanner[host]["tcp"].keys()
        for port in scanned_ports:
            port_name = scanner[host]["tcp"][port]["name"]
            port_prod = scanner[host]["tcp"][port]["product"]
            open_ports[port] = port_name + ", " + port_prod

        return "Success. Open TCP ports: " + str(open_ports)

