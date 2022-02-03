# Chat-app
A Real time chat application (Docker | React | Express)


### Dependencies
1. [Docker](https://docs.docker.com/install/)
2. [NPM](https://docs.docker.com/install/)
3. [NodeJS](https://docs.docker.com/install/)
</br>

### Running the project
1.  First set up your own `.env.` file, Use this command to generate it -> `cp env.env.docker-compose-example .env.docker-compose`
    </br>

2.  Install dependencies `npm install` From thr root directory.

3.  Run All -> Run `npm run docker-run:dev`
    </br>

4.  Stop  All -> Run `npm run docker-stop`
    </br>

5. In order to tail a __single service logs__ -> `docker-compose logs -f {service_name}`, 
   </br>

The apps are available (default port if not overridden).
* __server__ -> http://localhost:5000
* __client__ -> http://localhost:3000
</br>


### Executing into Dokcer containers
Run the following command -> `npm run bash -- {service-unique-name}`.   

For example to get into the Authentication micro-service, we can see that its unique name on the docker compose file is __chat-app-auth-service__
All you need to pass is the service unique name as an argument,so in our case it is `auth`. The final command will be `npm run bash -- auth`.
The bash scripts automatically read the `COMPOSE_PROJECT_NAME` defined variable form the `.env.docker-compose` file and use it as a prefix. IN our case it is `chat-app-`, and also add a static suffix of 
`-service` after the unique service name.


### Enviroment variables

##### Docker compose enviroment variables
The variables are defined in the `docker/.env` file.

##### Docker containers enviroment variables
* __server__: Defined in the `config/server.env` file.
* __redis__:  Defined in the `config/redis.env` file.
* __client__: Defined in the `config/client.env` file.