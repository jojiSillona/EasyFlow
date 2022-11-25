# EasyFlow

EasyFlow is an interactive College Schedule Planner that allows you to plan your next term with ease.

## Instructions

1. Clone the repository or download the zipped folder.
2. Open the command prompt.
3. Navigate to the project folder.
4. Install the necessary NPM libraries by running <pre>npm install</pre>
* You can use this line of code to download all of the NPM libraries at once:
<pre>
npm i connect-mongodb-session ejs express express-session express-validator mongoose nodemon multer jquery-ui-dist
</pre>
5. Make sure MongoDB is installed and running on port <pre>27017</pre>
* For mongosh, only typing the port number is needed.
* For MongoDB Compass, the connection string is <pre>mongodb://127.0.0.1:27017/</pre>
6. Uncomment line 11 in <pre>controller.js</pre> to initialize the contents of the database. This must only be done once to avoid duplication of data.
7. To run the application, execute <pre>nodemon server.js</pre>
8. Go to the browser and enter <pre>localhost:3000</pre> in the URL to access the web application.

## Features

We have thought of many features to include in this project
* An interactive drag-and-drop college flowchart
* User account system
* Sharing of flowcharts
* Customizable schedules from premade flowcharts provided by either EasyFlow or other users

And many more to be added!

### INITIAL DEVELOPMENT (09/26/2022)

<pre>
We have just started working with the project!

Mainly we have worked with the following pages:
</pre>
* Landing Page - Where first-time users get directed when opening the site
* Register Page
* Homepage - Where concurrent users get directed when opening the site
* View/Make a Flowchart
* My Profile
* User Settings
* Search Friends


## Collaborators

<pre>
shkayee
jojiSillona
czeska120
</pre>
