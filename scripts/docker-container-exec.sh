#/bin/sh
SERVICE_NAME=$1
COMPOSE_PROJECT_NAME=$(dotenv -e $npm_package_config_docker_env_file -- bash -c 'echo "$COMPOSE_PROJECT_NAME"' )
docker exec -it ${COMPOSE_PROJECT_NAME}-${SERVICE_NAME}-service sh