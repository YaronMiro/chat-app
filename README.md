# Chat-app
A Real time chat application (Docker | React | Express)


### Dependencies
1. [Docker](https://docs.docker.com/install/)
</br>

### Running the project
1.  First set up your own `.env.` file, Use this command to generate it -> `cp env.env.docker-compose-example .env.docker-compose`
    </br>

2.  Run All -> Run `npm run docker-run:dev`
    </br>

2.  Stop  All -> Run `npm run docker-stop`
    </br>

3. In order to tail a __single service logs__ -> `docker-compose logs -f {service_name}`, 
   </br>

The apps are available (default porst if not overriden).
* __server__ -> http://localhost:5000
* __client__ -> http://localhost:3000
</br>


### Executing into Dokcer containers
Run the following command -> `npm run bash -- {service_name}`.   

For exaple to get into the Authintication micro-service, we can see that its unique name on the docker compose file is __auth-service__  use this command 
`npm run bash -- chat-app-auth-service`


### Enviroment variables

##### Docker compose enviroment variables
The variables are defined in the `docker/.env` file.

##### Docker containers enviroment variables
* __server__: Defined in the `config/server.env` file.
* __redis__:  Defined in the `config/redis.env` file.
* __client__: Defined in the `config/client.env` file.