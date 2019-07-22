# Chat-app
A Real time chat application (Docker | PM2 | Redis | React | Express | Socket.io)


### Dependencies
1. [Docker](https://docs.docker.com/install/)


### Running the project
1.  Globally running all services in detach mode (server, client & redis),  
    then run the following commands -> `docker-compose up -d`

2.  In order to view a single service real time logs, then open a new terminal   
    window and run the following command `docker-compose logs -f {service_name}`.  
    Example for runing the `server` service -> `docker-compose logs -f server`


### Docker compose enviroment variables
The variables are defined in the `.env` file.


### Docker containers enviroment variables
* __server__ -> The variables are defined in the `server-container.env` file.
* __redis__ -> The variables are defined in the `redis-container.env` file.
* __client__ -> The variables are defined in the `client-container.env` file.