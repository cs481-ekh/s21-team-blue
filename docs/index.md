# PiRate

## Abstract:
Pirate is a standalone security scanner which emphasizes usability and customizability. Many security scanners exist on the market such as Nessus and OpenVAS. They all have
one thing in common: they are unusable for most people, and they are not customizable. Pirate attempts to answer these shortcomings by making a security scanner that is
simple to use and that can be easily extended.

The device works by connecting to a client computer through a direct LAN connection (the client computer must be taken off all other networks). The client accesses the PiRate controller through a webpage served by PiRate. The controller UI allows the client to run a number of security tests, display and evaluate the results, and even create their own custom tests.

Having a directly-connected LAN between the PiRate device and the client allows the PiRate software to safely emulate attack vectors and test security weaknesses of the client device, without exposing the either device to an internet-connected network. After a user runs a test or a set of tests, the results will be displayed in a table on the webpage. Users can then go through and delete any test results they don't want to keep, and save the remaining results to a file. 

PiRate can be beneficial for any researcher, engineer, or penetration tester desiring to run a fully-customizable testing framework for a single machine. Users can take advantage of the current testing suite while also having the ability to create and add any test they desire.

## Members:
 - Cole Gilmore
 - Max Hanson
 - Casey Lewis
