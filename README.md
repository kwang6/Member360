# MEMBER360
Welcome to the MEMBER360 application Git repository
## AngularJS application with Material Design Lite
MEMBER360 is made with care from AngularJS and uses Googles Material Design Lite instead of the standard Bootstrap setup.  This makes the application super fast, lightweight and responsive, while keeping it tied to industry standard best practices.
### Automation and Task's by Gulp
Gulp is a wonderful streaming build service for Modern Front End Applications and SPA's.
### Styles by SASS
SASS allows designers to create component styles and uses things like variables and mixins which are not allowed in native CSS
### Prerequisites:
First you will need a couple of things to get started...

- Node
- Gulp

#### Setup
Setup is easy and takes only a couple of minutes:

    $ npm install
    $ npm bower

#### Initial Build
Do an initial build of the application to ensure you are setup properly...

    $ gulp

#### Deploy Locally
To deploy the application locally on this following port: http:localhost:3000/#/

    $ gulp serve
    // Or
    $ npm gulp
#### Run Unit Tests
Unit Testing is done with KarmaJS and PhantomJS

    $ gulp test

#### Test Distributed Version Locally
Make sure the application is ready to integrate with your Spring back end and services

    $ gulp serve:dist

## TODO
- Update Node/NPM
- Update deprecated NPM packages
- Pass linting Tests (Unused vars, etc) - 77 problems (77 errors, 0 warnings)
- Remove Material Lite
- Remove Bower
- Organize modules, etc per "Initial Suggestions" email sent on 9/15/16
