[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

This application is based on MEAN.JS which is a full-stack JavaScript open-source solution and provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications.

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process. Make sure you've installed Node.js and npm first, then install grunt globally using npm:

```bash
$ npm install -g grunt-cli
```

### Clone The GitHub Repository
You can use Git to directly clone the INFLO repository from githubb:
```bash
$ git clone https://github.com/Octo-Hackathon/octo-mock2.git
```
This will clone the latest version of the INFLO repository to a **octo-mock2** folder. 

## Quick Install
Once you've cloned the repository and installed all the prerequisites, go to octo-mock2/mean directory and install Node.js dependencies using npm:

```bash
$ npm install
```

## Running Your Application
After the install process is over, you'll be able to run your application using Grunt. Just run grunt default task:

```bash
$ grunt
```

Your application should run on port 3000, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! Your application should be running. 

## Testing Your Application
To execute only the server tests, run the test:server task:

```
$ grunt test:server
```

## Running in a secure environment
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:
```bash
$ sh ./scripts/generate-ssl-certs.sh
```
Windows users can follow instructions found [here](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority).
After you've generated the key and certificate, place them in the *config/sslcerts* folder.