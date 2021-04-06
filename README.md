![Main workflow](https://github.com/cs481-ekh/s21-team-blue/workflows/Build/badge.svg)


# PiRate
BSU CS481 Capstone Project


### Access
To access the webpage, go to http://192.168.0.202:3000 in any web browser on any device on your LAN, and you should see the homepage.


### Using auto-start script for program

First: Move the `dhcpcd.conf` file into the /etc/ folder on the Pi, overwrite the old one in the folder

Second: Move the `.bashrc` file into the /home/pi/ folder on the Pi, overwrite the old one in the folder

Third: Move the `serverscript.py` file into /home/pi/s21-team-blue/backend folder on the Pi, this needs to be the path for the script/project otherwise things break

Fourth: That's it, now whenever you login, boot up the terminal, or ssh into the Pi it should automatically run the script and make sure everything is compiled for the program

Optional: You can edit your hosts file to overwrite the IP for the Pi/Server to just autoconnect on a name like PiRate.net, location is: /etc/hosts for Mac/Linux/OsX, C:/windows/system32/drivers/etc/hosts for Windows.

(If nothing has changed since you last booted up and you don't need to recompile everything just hit Ctrl+C in the terminal to exit out of the script and you can run things manually from there)
