    
         ____                    __                        __      
        /\  _ \                 /\ \__                    /\ \__   
        \ \ \/\ \    ___     ___\ \  _\         __      __\ \  _\  
         \ \ \ \ \  / __ \ /  _  \ \ \/       / _  \  / __ \ \ \/  
          \ \ \_\ \/\ \ \ \/\ \/\ \ \ \_     /\ \ \ \/\  __/\ \ \_ 
           \ \____/\ \____/\ \_\ \_\ \__\    \ \____ \ \____\\ \__\
            \/___/  \/___/  \/_/\/_/\/__/     \/____\ \/____/ \/__/
                                                /\____/            
                                                \____/             
                   __                                 __     
                  /\ \                               /\ \    
                  \ \ \____    ___      __     _ __  \_\ \   
                   \ \  __ \  / __ \  / __ \  /\  __\/ _  \  
                    \ \ \ \ \/\ \ \ \/\ \ \ \_\ \ \//\ \ \ \ 
                     \ \____/\ \____/\ \__/ \_\\ \_\\ \_____\
                      \/___/  \/___/  \/__/\/_/ \/_/ \/_____/
                      
                      
[![Codacy Badge](https://www.codacy.com/project/badge/5d2f0a877ddc4f7f8299129b1873a6d6)](https://www.codacy.com/public/sat/DGB_App) [![Dependency Status](https://david-dm.org/DontGetBoard/DGB_App.svg)](https://david-dm.org/DontGetBoard/DGB_App)
                                               
Requirements
------------

You must have `npm` and `mongod` to run this application.


Environments Variables
----------------------

| Variable  | Usage |
|---------|------|
| DGB_APP_NEW_RELIC_KEY | New Relic Api Key     |
| DGB_MAILGUN_API_KEY        | MailGun API Key     |
| DGB_MAILGUN_DOMAIN        | MailGun API Domain     |
| DGB_PASSPORT_SECRET        | Secret Passphrase to generate Hashes     |
| DGB_MAILCHIMP_API_KEY        | MailChimp API Key     |
| DGB_MAILCHIMP_LIST_ID        | MailChimp List ID     |


Installation
------------                                               

Setup the application with:

    npm install
  
Run MangoDB to host the database:

    mangod
  
Launch the application:

    npm start
  
then browse to `http://localhost:3000`


Routes
------

    GET   /
    GET   /login
    POST  /login
    GET   /signup
    POST  /signup
    GET   /logout       (must be auth)


Dependencies
------------

    "dependencies": {
      "bcrypt-nodejs": "latest",
      "body-parser": "~1.8.1",
      "connect-flash": "~0.1.1",
      "cookie-parser": "~1.3.3",
      "debug": "~2.0.0",
      "ejs": "~0.8.5",
      "express": "~4.9.0",
      "express-session": "~1.0.0",
      "mailgun-js": "^0.6.7",
      "mongoose": "^3.8.19",
      "morgan": "~1.3.0",
      "newrelic": "^1.14.2",
      "nodejs-gravatar": "^1.0.2",
      "passport": "~0.1.17",
      "passport-local": "~0.1.6",
      "serve-favicon": "~2.1.3"
    }

Thanks To 
---------
Icons: 

- players.svg => [Daniel Bruce](http://www.flaticon.com/free-icon/user-group_3671)
- clock.svg => [Daniel Bruce](http://www.flaticon.com/free-icon/back-in-time_3712)

Plugins:

- [Animate.css](http://daneden.github.io/animate.css/)
- [AngularJS](https://angularjs.org/)
- [Equalize.js](http://tsvensen.github.io/equalize.js/)
- [Foundation](http://foundation.zurb.com/)

