    
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
                      
                      
                                               
                                               
Requirements
------------

You must have `npm` Setup and `mongod` to run this application.


Environments Variables
----------------------

- DGB_APP_NEW_RELIC_KEY => New Relic Api Key
- DGB_MAILGUN_API_KEY => MailGun API Key
- DGB_MAILGUN_DOMAIN => MailGun API Domain
- DGB_PASSPORT_SECRET => Secret Passphrase to generate Hashes


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

  GET   /login
  POST  /login
  GET   /signup
  POST  /signup
  GET   /logout
  GET   /bugs     (must be auth)
  GET   /bugs/new   (must be auth)
  POST  /bugs/new   (must be auth)
  GET   /bug/:id/assign (must be auth)
  POST  /bug/:id/assign (must be auth)
  GET   /bug/:id/close  (must be auth)
  POST  /bug/:id/close  (must be auth)


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

