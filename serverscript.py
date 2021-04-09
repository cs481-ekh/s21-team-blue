import subprocess


subprocess.run(["sudo", "apt-get", "update", "-y"], stdout=subprocess.DEVNULL)
subprocess.run(["sudo", "apt-get", "upgrade", "-y"], stdout=subprocess.DEVNULL)
subprocess.run(["sudo", "apt", "install", "dnsmasq", "-y"], stdout=subprocess.DEVNULL)
subprocess.run(["sudo", "systemctl", "restart", "dnsmasq"], stdout=subprocess.DEVNULL)
subprocess.run(["sudo", "apt", "install", "dnsutils", "-y"], stdout=subprocess.DEVNULL)
subprocess.run(["sudo", "apt-get", "install", "python3.6", "-y"], stdout=subprocess.DEVNULL)
subprocess.run(["sudo", "apt-get", "install", "nmap", "-y"], stdout=subprocess.DEVNULL)

# proc = "nvm install 15.10.0"
# run = subprocess.Popen(["/bin/bash", "-i", "-c", proc])
# run.communicate()
# exit = run.wait()

# subprocess.run(["cd", "/home/pi/s21-team-blue/web-app"], shell=True, stdout=subprocess.DEVNULL)
# subprocess.run(["sudo", "npm", "ci"], stdout=subprocess.DEVNULL)
# subprocess.run(["sudo", "npm", "run", "pro-build"], stdout=subprocess.DEVNULL)

# subprocess.run(["cd", "/home/pi/s21-team-blue/backend"], shell=True, stdout=subprocess.DEVNULL)
# subprocess.run(["sudo", "npm", "ci"], stdout=subprocess.DEVNULL)
# subprocess.run(["sudo", "npm", "start"], stdout=subprocess.DEVNULL)

# sudo apt-get update -y
# sudo apt-get upgrade -y
# sudo apt install dnsmasq -y
# sudo systemctl restart dnsmasq -y
# sudo apt install dnsutils -y
# sudo apt-get install python3.6 -y

# wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
# nvm install 15.10.0

# cd /home/pi/s21-team-blue/web-app
# sudo npm ci
# sudo npm run pro-build

# cd /home/pi/s21-team-blue/backend
# sudo npm ci
# sudo npm start
