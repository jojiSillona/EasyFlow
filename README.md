![image](https://drive.google.com/uc?export=view&id=1k2cXEq_GKrpkx61DkVS3F-oXZ4q--uiF)

### Having a hard time planning for your next term? Let me help you with that!

EasyFlow is a college project for the course CCAPDEV (*a.k.a Web Application Development*) created to help students plan for their upcoming term by using an Interactive Flowchart Planner.

## Features

### Visualize your entire stay using Flowcharts!

The College of Computer Studies use a visual flowchart to show which subjects to take on each term. However, making changes to the flowchart mean making a separate text/visual document to create changes. EasyFlow removes the need for that!

<!-- INSERT IMAGE/GIF OF EASYFLOW MAIN FLOWCHART CREATOR -->

EasyFlow lets you move subjects that you intent to take in another time.

### Sharing is Caring!

Sharing is always fun! That's why users can view other people's flowchart!

<!-- INSERT IMAGE/GIF OF VIEWING USERS -->


## Instructions
The application can be viewed by either going through the Render link: https://easyflow.onrender.com or downloading the files locally. The instructions below are for the latter option.
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

## Creators
<!-- REPLACE PRE WITH AN IMAGE -->
<pre>
shkayee
jojiSillona
czeska120
</pre>

## DISCLAIMER

This repository is not being updated anymore since an Alpha version of EasyFlow is being planned. Updates of the project will be available soon.

Version PROTOTYPE
