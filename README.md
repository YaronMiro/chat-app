# Chat-app
A Real time chat application (Docker | PM2 | Redis | React | Express | Socket.io)


### Dependencies
1. [Docker](https://docs.docker.com/install/)
</br>

### Running the project
1.  First set up your own `.env.` file, Use this command to generate it -> `cp config/compose.env docker/.env`
    </br>

2.  Globally running all services (server, client & redis) -> `cd docker` and the run `docker-compose -f docker/docker-compose.yml up`
    </br>

3.  Globally running all services in __detach mode__ (server, client & redis) -> `cd docker` and the run `docker-compose up -d`  
    </br>

4. In order to tail a __single service logs__ -> `docker-compose logs -f {service_name}`, 
   </br>

The apps are available (default porst if not overriden).
* __server__ -> http://localhost:5000
* __client__ -> http://localhost:3000
</br>

### Enviroment variables

##### Docker compose enviroment variables
The variables are defined in the `docker/.env` file.

##### Docker containers enviroment variables
* __server__: Defined in the `config/server.env` file.
* __redis__:  Defined in the `config/redis.env` file.
* __client__: Defined in the `config/client.env` file.