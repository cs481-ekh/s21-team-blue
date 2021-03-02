![Main workflow](https://github.com/cs481-ekh/s21-team-blue/workflows/Build/badge.svg)


# PiRate
BSU CS481 Capstone Project

## Running Angular App with Node Express
### Installation
To run the Angular App with the Node Express Server, you need to install NodeJS, NPM, and the Angular CLI (Command-Line Interface). [Here](https://nodejs.org/en/) is a link to download NodeJS, which also installs npm. 

Once NodeJS and npm are installed on your machine, open a terminal and run the following command (in any directory):
`npm install -g @angular/cli`

### Compiling the Angular App
Now that all 3 components are download, open a terminal and navigate to `[this_project_root]/web-app`. From this directory, execute the following 2 commands:

`npm ci` (Installs the required modules for the program)

`npm run pro-build` (Builds the production version of the Angular app, and stores the files in `./backend/dist/web-app`)

### Running the Node Express Server
To start the Node Express Server, navigate to `./backend/`. You should now see a directory called `/dist/web-app/` with the web app's production files that were just generated. From this directory, execute the following 2 commands:

`npm ci` (Installs the required modules for the program)
`npm start` (Starts the Node Express Server)

### Access
To access the website, navigate to `http://localhost:3000/` in your preferred browser.
