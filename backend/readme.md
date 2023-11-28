# Fullstack Exam Project
Lisa Mari Myrene, Anosh Chaudhry & Alexandra Eloise Vanje

## Deploy & install application (backend)

1. To clone the project (link):

    https://github.com/ntnu-design/idg2100-2023-final-exam-tabletennisleague 

2. Start a new terminal and go inside the backend folder: `cd backend`. You are going to run the backend folder and the frontend folder on two seperate terminals. 

3. Run the provided installing script by typing `npm run backend` in the terminal. 

This script will install all dependencies, add an `.env` file with the needed information (if not already existing), and at last start the server in the terminal. There will already be added dummy data in the provided database.

If you managed to stop the backend server and want to restart it, you can type `npm run server` in the terminal (be sure to be inside the backend folder).

### Users credentials for login

1. Regular user:
  
   Email: jane.smith@ntnu.no
   Password: password456

2. Admin user: 

   Email: emilb@ntnu.no
   Password: password123


### Swagger link

http://localhost:5005/docs/ 


### Dependencies

In case the dependencies wont install properly, here is a list of modules that needs to be installed:

    "dependencies": {
        "bcryptjs": "^2.4.3",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "jsonwebtoken": "^9.0.0",
        "mongoose": "^7.0.4",
        "mongoose-autopopulate": "^1.0.0",
        "nodemailer": "^6.9.3",
        "nodemon": "^2.0.22",
        "swagger-jsdoc": "^6.2.8",
        "swagger-ui-express": "^4.6.3"
    }


## Other

The backend part of this project is based on oblig2 and oblig3 (by Lisa Mari Myrene and Anosh Chaudhry) of the IDG2100 Fullstack course. 
That acts like a basis, and then all group members have further developed it with new and updated functionalities. 

The project is based on what we have learned in the Fullstack course. Otherwise it's stated in the code.
