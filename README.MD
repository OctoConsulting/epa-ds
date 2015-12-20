INFLO
======

By Octo Labs
----------------------

**INFLO** is a contextual and  situational awareness dashboard build on top of data sets from EPA and the US Census Bureau.  **INFLO** allows the user to search by city name and provides situational data such as median income, % unemployed, travel safety, air quality, water quality, and demographical information such as gender, race and housing.  **INFLO** also provides an aggregated score or an INFLO Rating which serves index for quality of living for that city.  Currently **INFLO** focuses on two different types of aspects of visualizations: basic bar charts to display historical EPA data and near real-time charts for displaying the more frequently updated US Census Bureau data.

Developing INFLO
================

We designed **INFLO** with the goal of using only open source technologies.  As such we leveraged technologies such as MEAN and RoR stacks for development and MongoDB for backend processing.  A full list of the technologies used can be found below:

Development Environment
-----------------------

1.  Vagrant - used to quickly spin up a development environment.
2.  Ruby On Rails - used to build the Census API which retrieves the data from Census and transforms it to our UI specifications.  Additioanlly, we built an ETL process using Ruby to load and transform data sets from EPA.
3.  MEAN Stack - used to query MongoDB, develop services and display visualizations.

Backend
-------
1.  MongoDB

Application Server
------------------
1.  NodeJS - for MEAN
2.  Webrick - RoR

Testing
-------
1.  Rspec - unit testing for Ruby platform
2.  Mocha - unit testing for services
3.  Karma - unit testing for front end
4.  Protractor - end to end testing for MEAN

DevOps
------
1.  Jenkins - Continuous Integration
2.  Grunt - Continous Deployment
