# MEDHEROES #
We were the MedHeroes team. The members were mkimurat (Minna Kimura-Thollander), Catherine Li (cli75), and Shani Abass
(sabass).

## Roles ##
mkimurat (full-stack) - Front-end prototype, back-end, and designing avatars. <br></br>
cli75 (front-end) - Front-end styling. <br></br>
sabass (designer) - Designing rewards.

## Resources ##
We used the following resource to help us set up back-end signup, login verification, and logout. We do not claim the
code as belonging to us. We followed the tutorial to set up our registration and login system, and then made small
edits to the code.
In particular, we do not claim ownership of the UserSchema.statics.authenticate method, UserSchema.pre('save') method,
and get requests to signup, login, and logout code in our server.js.
https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359

The Dialog code came from a demo from Material-UI. The code for that is here:<br></br>
https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/dialogs/FormDialog.js

## Images ##
All images except for the pencil edit icon, home icon, and profile icon (on the navbar) belong to us. The pencil icon is from kissclipart.com.The home icon is from https://www.flaticon.com/authors/anton-saputro. The profile icon is from https://www.flaticon.com/authors/dave-gandy.<br></br>
Avatar images belong to mkimurat. <br></br>
Reward images and medicine pill image belong to sabass.

## Notes ##
The colors appear much more opaque or faded on the department machine due to their color settings and different screen type. This makes some of our light gray and light blue colors appear almost white. However, they are much more saturated on phone screens (intended use environment) and laptops.

We have handed in our code running on localhost, so you just have to do npm install for both the server and the react_app
and then do npm start and node server.js to run it.

We would have handed it in on AWS, but we are at 100% for S3 so it would cost us money to do so.

## Documentation for our Client ##
### Database ###
If you would like to access our mongoDB account, the credentials are:

username: cath@brown.edu
password: webapps0!

Alternatively you may set up your own mongoDB account (for free) and replace this url in the server:
const url = "mongodb+srv://webapps:ABC123@cluster0-jqqcm.mongodb.net/test?retryWrites=true";
with the url of your cluster.

### File comments ###
Here are comments on what each file in react_app generally handles:
- <b>App.js:</b> handles routing between different pages of the web app
- <b>Login.js:</b> handles the Login page (user authentication, wrong username/password/fields empty popup)
- <b>Signup.js:</b> handles the Signup page (creates new user, privacy policy, form input verification and popups)
- <b>Home.js:</b> handles the Home page (shows profile pic, username, list of medication, current reward, check-off popup, and reward success popup)
- <b>Profile.js:</b> handles the Profile page (displays profile pic, username, list of medication, current reward)
- <b>Medicine.js:</b> handles medication check-off (in the Home page)
- <b>Avatar.js:</b> "Avatar Selection" page (lets users pick their avatar)
- <b>ChangeMedicine.js:</b> allows users to edit or delete their medication
- <b>Reward.js:</b> handles the "Reward Selection" page (allows users to select their reward and name it)
- <b>index.js:</b> React setup (do not edit)
- <b>CSS files:</b> styling

Comments of what every function does can be found in the individual files.

### Running locally ###
Should you want to run this program locally, you should:
1. Copy the project onto your computer. You can put it inside any of your files, but it may be easiest to put it on your Desktop.

2. Open a terminal and go into webapps2019 folder. You can do this on Mac by dragging the folder into your terminal.
On Windows you will have to cd (change directory) and move into the folder manually. To cd, you will have to find the file path of the webapps2019 folder, and run (ie, type the following text within the quotes and hit enter) "cd [filepath]" in the terminal. If you put the project on your Desktop, run "cd Desktop/webapps2019".

3. In the same terminal as step 2, once you are in the webapps2019 folder, run "node server.js". This will start the server (back-end) side. You will not see anything popup. Make sure to keep this terminal running for as long as you would like the server to run or for as long as you'd like to use the website. Exiting out of this terminal will stop the server (minimizing the window won't affect anything).

4. Open another terminal and go into react_app folder. The react_app folder is located inside the webapps2019 folder. On Mac, you can go into the react_app folder by dragging the folder into this terminal. On Windows, you can repeat the steps you did to cd into the webapps2019 folder, and once inside webapps2019, run "cd react_apps". In this terminal, run "npm start". This will display the webpages (front-end). Wait a little and a new tab will automatically open on your browser, showing the application.

If there are "Module not found: Can't resolve [some module name]" errors displayed after running "npm start", run "npm install [some module name here]". For example, if there is "Module not found: Can't resolve react-s-alert", then run "npm install react-s-alert". Do this for every "Module not found" error you receive until there are none left. Then run "npm start", and the program should appear in your browser after a few seconds.


And, if you have any trouble, feel free to contact us at any time. :)
