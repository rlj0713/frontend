# frontend

Please refer to this repo for the backend of this project - https://github.com/rlj0713/backend2

Walkthrough of Cryptoquote - https://youtu.be/9dXZw8p4Mrw

Name: Cryptoquote Generator

Description: This application has two main capabilites
    1) Users can input a sentence of any kind, and that sentence will be transformed into an interactive cipher puzzle.

    2) Users can choose to solve a randomly genereated puzzle based on difficulty.

Installation:  To host this application or add to the project:
    1) Fork this repo along with the backend package.
    2) On the rails backend:
        a) run bundle install
        b) rails db:migrate & rails db:seed
        c) boot up a server with rails s
    3) Open the application locallay using explorer.exe index.html

    To host externally make sure you upgrade the database from sqlite3 to postgres.

Support:  Please e-mail me directly at rlj0713@gmail.com for help and tips on how to make this work on your machine.

Contributing: Please fork this repo and add to my project.  All code here is open-source and free to use. 

Project Status: This is a stand-alone project with no anticipated regular maintenance.





Project Requirements:

5 min explanation of concept: https://youtu.be/9dXZw8p4Mrw

Blog Post: https://rlj0713.medium.com/ruby-in-the-back-js-api-in-the-front-14e0ba23114b

Project Requirement Checklis:

[x] Use classes and functions to organize your code into reusable pieces.
[x] Translate JSON responses into JavaScript model objects using ES6 class or constructor function syntax.
[x] Use ES6 features when appropriate (e.g. arrow functions, let & const, rest and spread syntax).

[x] Follow Rails MVC and RESTful conventions. That means, for example, that a request GET /puppies ought to be handled by the PuppiesController, fetch puppies from the database using a Puppy Active Record model, and return a list of puppies as JSON.

[x] Well-named variables and methods
[x] Short, single-purpose methods

[x] Aim for a large number of small commits - commit frequently!
[x] Add meaningful messages to your commits. When you look back at your commits with git log, the messages should describe each change.

[x] Don't include changes in a commit that aren't related to the commit message