# EPA Environmental Digital Services Solicitation # SOL-DC-16-00010 #
## Octo Consulting Group ##
## Response to Solicitation # SOL-DC-16-00010 ##

LIVESAFE
========

<p align="center">
  <img src="https://github.com/OctoConsulting/epa-ds/blob/master/Docs/livesafe-logo-tagline.jpg">
</p>

Prototype URL:
<https://livesafe.octoconsulting.com>

# INTRODUCTION #

**LIVESAFE** is a contextual and  situational awareness dashboard build on top of data sets from EPA and the US Census Bureau.  **LIVESAFE** allows the current/prospective residents or business owners who want socioeconomic and environmental information on counties to search **LIVESAFE** by county name and it returns situational data such as median income, % unemployed, travel safety, air quality, water quality, and demographical information such as gender, race and housing.  Additionally, **LIVESAFE** provides users the ability to compare data between two different counties or just view the data graphically for one county. Currently **LIVESAFE** focuses on two different aspects of visualizations: basic bar charts to display historical EPA data and near real-time charts for displaying the more frequently updated US Census Bureau data.  Octo's team used a user-centric approach and followed an agile delivery process in delivering the **LIVESAFE** application across multiple releases. The key highlights of our approach include:
*	Focus on user experience through the creation of user personas, user testing and market surveys
*	Use of Scrum to manage the backlog and delivery of the development team
*	Use of Kanban for managing the backlog for User Interface and User Experience (UI/UX) and DevOps teams
*	Use of docker containers, docker hub and Jenkins to automate continuous integration and delivery

# Deployment Instructionns #

**LIVESAFE** is deployed using [Docker](http://docker.com). In order to deploy the **LIVESAFE** application in your own Docker environment, you can run the following commands to get started (you will need the latest versions of [Docker](https://docs.docker.com/engine/installation/) and [Docker Compose](https://docs.docker.com/compose/) installed):

	$ git clone https://github.com/OctoConsulting/epa-ds
	$ cd epa-ds/docker_compose
	$ docker-compose -f docker-compose.yml up -d
	
This will start the container listening on port 80, you can specify a different port by changing docker-compose.yml file. Also, this port will have to be open and accessible on your server.

### Get the container ID of the image octoconsulting/epa-ds-webapp with docker ps ###
	# docker ps
	CONTAINER ID          IMAGE                      	   ...
	[container_id]        octoconsulting/epa-ds-webapp     ...
	[container_id]        octoconsulting/epa-ds-database   ...

### Tell the container to fetch and build the application ###
	docker exec [container_id] /usr/local/bin/buildWebApp.sh

### ... That's it! ###
Once the build is complete you can access the application on the port you specified above.

For example, if the prototype is deployed on port 80, you can access the prototype using the following URL:

	http://<IP address of the VM>:80/

# Developing LIVESAFE #

## Our Approach ##
The following diagram outlines our approach for responding to the solicitation and for the continuous delivery of MedCheck.

![Image of LIVESAFE](https://github.com/OctoConsulting/epa-ds/blob/master/Docs/UI/Graphic%20Resources/approach.png?raw=true)

## Technology Stack and Tools #
We designed **LIVESAFE** with the goal of using only open source technologies.  As such we leveraged technologies such as the MEAN stack for development and MongoDB for backend processing.  A full list of the technologies used can be found below:

Tier | Tools |
--- | --- |
Development Environment | Docker, MEAN Stack |
Database | MongoDB |
Application Server | NodeJS |
Testing | Mocha, Karma, Protractor |
DevOps | Jenkins, Grunt |

![Image of Technologies](https://github.com/OctoConsulting/epa-ds/blob/master/Docs/UI/Graphic%20Resources/techstack.png?raw=true)