# EPA Environmental Digital Services Solicitation #
## Octo Consulting Group ##
## Response to Solicitation # SOL-DC-16-00010 ##

# LIVESAFE #
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

# Deployment Instructions #
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

### Future Enhancement ###
**ToDo:** Integration of docker image building within CI/CD pipeline

# Developing LIVESAFE #

## Consuming & Remixing Data ##
The datasets we chose to use for **LIVESAFE** are:
*	[EPA EQI Data @ data.gov](http://catalog.data.gov/dataset/usepa-environmental-quality-index-eqi-air-water-land-built-and-sociodemographic-domains-transf)
*	[Census Data via Census API](http://api.census.gov/data/2010/)

To create a contextual experience using data from both EPA and Census required some in-depth analysis.  While the census data was straight forward and easy to use the EPA EQI dataset was not and definitely would require a domain SME to digest and make sense of the data.  The EQI data set, untouched, provided the values for each of the chemicals as a standard deviated number which provided no contextual information.  Without the aid of a SME we were stuck.  To mitigate this, we decided to create an algorithm which would 1) covert the standard deviated values to an index of 1 to 100 and then 2) which would covert that to a percentile.  This would then give us a story to tell by contrasting the values of one county against another.  The algorithm is documented belwo:

1.  Develop a step value which should represent the avergage difference between the values from minium to maximum.  This was determined to be 0.1
2.  Develop a formula to determine the position in the index range: position = [value + step - minvalue] / step
3.  Store the number of total values in a variable: #ofVal = [(maxval - minval)/step] + 1
4.  Calculate percentile: if negative value [(1 - (position/#ofVal))*100]; if positive value [position/#ofVal]*100

## Future Development ##
Our intent was to develop about 4 more features but due to time constraints we were unable to do so.  To illustrate that fact and to demonstrate that we went through the necessary planning see screenshot below of our trello backlog:
![Image of TRELLO](https://github.com/OctoConsulting/epa-ds/blob/master/Docs/UI/Graphic%20Resources/future%20features.png?raw=true)

## Our Approach ##
The following diagram outlines our approach for responding to the solicitation and for the continuous delivery of **LIVESAFE**.
![Image of LIVESAFE](https://github.com/OctoConsulting/epa-ds/blob/master/Docs/UI/Graphic%20Resources/agile%20development.jpeg?raw=true)

## Technology Stack and Tools ##
We designed **LIVESAFE** with the goal of using only open source technologies.  As such we leveraged technologies such as the MEAN stack for development and MongoDB for backend processing.  A full list of the technologies used can be found below:

Tier | Tools |
--- | --- |
Development Environment | Docker, Angular.js, Node.js |
Database | MongoDB |
Application Server | NodeJS |
Testing | Mocha, Karma, Protractor |
UI | Bootstrap |
DevOps | Jenkins, Grunt |

![Image of Technologies](https://github.com/OctoConsulting/epa-ds/blob/master/Docs/UI/Graphic%20Resources/techstack.png?raw=true)