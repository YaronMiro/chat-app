# Chat-app
A Real time chat application (Docker | PM2 | Redis | React | Express | Socket.io)


### Dependencies
1. [Docker](https://docs.docker.com/install/)


### Running the project
1.  Globally running all services (server, client & redis) -> `docker-compose up`
    </br>

2.  Globally running all services in __detach mode__ (server, client & redis) -> `docker-compose up -d`  
* In order to view a __single service logs in real time__: 
  You can use this command -> `docker-compose logs -f {service_name}`, 
  e.g for `server` service -> `docker-compose logs -f server`


### Docker compose enviroment variables
The variables are defined in the `.env` file.


### Docker containers enviroment variables
* __server__ -> The variables are defined in the `config/server.env` file.
* __redis__ -> The variables are defined in the `config/redis.env` file.
* __client__ -> The variables are defined in the `config/client.env` file.