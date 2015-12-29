# EPA/OEI Environmental Digital Services RFI #
## Octo Consulting Group ##
## Deployment Instructions ##

LiveSafe is deployed using [Docker](http://docker.com). In order to deploy the LiveSafe application in your own Docker environment, you can run the following commands to get started (you will need the latest versions of [Docker](https://docs.docker.com/engine/installation/) and [Docker Compose](https://docs.docker.com/compose/) installed):

	$ git clone https://github.com/OctoConsulting/setup-livesafe
	$ cd setup-livesafe
	$ docker-compose -f docker-compose.yml up -d
	
This will start the container listening on port 80, you can specify a different port by changing docker-compose.yml file. Also, this port will have to be open and accessible on your server.

## Get the container ID of the image octoconsulting/epa-ds-webapp with docker ps ##
	# docker ps
	CONTAINER ID          IMAGE                      	   ...
	[container_id]        octoconsulting/epa-ds-webapp     ...
	[container_id]        octoconsulting/epa-ds-database   ...

## Tell the container to fetch and build the application ##
	docker exec [container_id] /usr/local/bin/buildWebApp.sh

## ... That's it! ##
Once the build is complete you can access the application on the port you specified above.

For example, if the prototype is deployed on port 80, you can access the prototype using the following URL:

	http://<IP address of the VM>:80/

