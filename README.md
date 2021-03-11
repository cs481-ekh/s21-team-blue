# PiRate
BSU CS481 Capstone project template

## Running Angular App
### Installation
To run the Angular App locally, you need to install NodeJS, NPM, and the Angular CLI (Command-Line Interface). [Here](https://nodejs.org/en/) is a link to download NodeJS, which also installs npm. 

Once NodeJS and npm are installed on your machine, open a terminal and run the following command (in any directory):
`npm install -g @angular/cli`

### Execution
Now that all 3 components are download, open a terminal and navigate to `[this_project_root]/web-app`. From here, run the following 2 commands:

`npm ci` (installs the required modules for the program)

`ng serve` (runs the program locally)

### Access
To access the webpage, go to http://localhost:4200 in any web browser, and you should see the homepage.

### DNSmasq Setup
Update the RaspberryPi before moving forward with these terminal commands:

`sudo apt-get update`
`sudo apt-get upgrade`

Install DNSmasq:

`sudo apt install dnsmasq`

Drag and drop (or copy over) the dnsmasq.conf file in /backend from the repository into: /etc on the RaspberryPi
Restart dnsmasq:

`sudo systemctl restart dnsmasq` (if this doesn't work do a: sudo reboot)

Check that DNSmasq is installed and running with:

`sudo systemctl status dnsmasq`
You should get a large print out of information in the terminal with a little green line that should say active (running).

### Install DNSutils for future caching of static addresses:

`sudo apt install dnsutils`

Check that DNSutils is working by running:

`dig <any website here> @localhost`
  
You should get another large printout of information with the response time being around 50-100ms if you pinged google.com
Running the command again you should see that the response time is now at just about 0ms.
