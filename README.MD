LIVESAFE
========

By Octo Labs
----------------------

About LIVESAFE
==============

**LIVESAFE** is a contextual and  situational awareness dashboard build on top of data sets from EPA and the US Census Bureau.  **LIVESAFE** allows the current/prospective residents or business owners who want socioeconomic and environmental information on counties to search **LIVESAFE** by county name and it returns situational data such as median income, % unemployed, travel safety, air quality, water quality, and demographical information such as gender, race and housing.  Additionally, **LIVESAFE** provides users the ability to compare data between two different counties or just view the data graphically for one county. Currently **LIVESAFE** focuses on two different aspects of visualizations: basic bar charts to display historical EPA data and near real-time charts for displaying the more frequently updated US Census Bureau data.

Developing LIVESAFE
===================

We designed **LIVESAFE** with the goal of using only open source technologies.  As such we leveraged technologies such as the MEAN stack for development and MongoDB for backend processing.  A full list of the technologies used can be found below:

Tier | Tools |
--- | --- |
Development Environment | Docker, MEAN Stack |
Database | MongoDB |
Application Server | NodeJS |
Testing | Mocha, Karma, Protractor |
DevOps | Jenkins, Grunt |


Development Environment
-----------------------

1.  Docker - used to quickly spin up a development environment.
2.  MEAN Stack - used to query MongoDB, develop services and display visualizations.

Backend
-------
1.  MongoDB

Application Server
------------------
1.  NodeJS - for MEAN

Testing
-------
1.  Mocha - unit testing for services
2.  Karma - unit testing for front end
3.  Protractor - end to end testing for MEAN

DevOps
------
1.  Jenkins - Continuous Integration
2.  Grunt - Continous Deployment
