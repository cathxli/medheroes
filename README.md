# MedHeroes #
MedHeroes is a mobile platform that helps motiate young children to take their long-term prescribed medication. Our team of three worked alongside our client, Dr. Nick Grumbach (Pediatrician), to refine the product idea and actualize it through development.

## Team ##
Catherine Li (Product Designer & Front-End Developer)
- User research, product scoping, client meetings
- Wireframes, hi-fi iterations through Adobe XD
- Front-end implementation through React
- Cloud deployment through AWS (now discontinued due to cost), database set-up through MongoDB 

Minna Kimura-Thollander (Full-Stack Developer)
- User research, product scoping, client meetings
- Wireframe implementation
- Back-end functionality
- Animal avatar illustrations

Shani Abass (Illustrator)
- User research, client meetings
- Reward illustrations

## Stack ##
- Front-end: React
- Back-end: Node/Express server
- Database: MongoDB
- Hosting: AWS (now discontinued due to cost)

## Product ##
MedHeroes motivates young children from ages 6-13 to take their long-term prescriptions on schedule. Parents and children are able to create custom rewards together, encouraging children to take medication on schedule for a set number of days to obtain a reward. Parents and doctors are able to input medication names and descriptions themselves in child-friendly terms, along with how frequent it needs to be taken. Children will be able to check off the medications they need to take that day, and get one step closer to gaining a reward. 

MedHeroes is designed to be fun and playful for children, and super easy to use across user groups. It is designed to be used on a parent's phone, with parental supervision. Iimportant features like checking-off medication and editing medication info are password-protected. Pediatricians are also able to input medication info, instructions, or frequency directly to MedHeroes during check-ups.

Features include:
- Register for user account/Login to user account
- Choose user avatar
- Input or edit medication name, description, and frequency
- Check-off medication (password protected)
- Set reward and goal # of days

## Demo ##
[Demo here!](https://vimeo.com/359226882)

## Images ##
All images except for the pencil edit icon, home icon, and profile icon (on the navbar) belong to us. The pencil icon is from kissclipart.com. The home icon is from https://www.flaticon.com/authors/anton-saputro. The profile icon is from https://www.flaticon.com/authors/dave-gandy.<br></br>
Avatar images belong to mkimurat. <br></br>
Reward images and medicine pill image belong to sabass.

## Documentation for our Client ##

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
1. Download repo
2. If it is the first time running this project, run "npm install", then "npm start" inside webapps2019. Otherwise, just run "npm start".
3. If it is the first time running this project, open another terminal and run "npm install", then "npm start" inside react_app. Otherwise, just open a new terminal and run "npm start" in react_app.
