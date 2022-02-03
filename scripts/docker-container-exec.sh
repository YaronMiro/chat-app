#/bin/sh
SERVICE_NAME=$1
COMPOSE_PROJECT_NAME=$(dotenv -e ./config/.env.docker-compose -- bash -c 'echo "$COMPOSE_PROJECT_NAME"' )
docker exec -it ${COMPOSE_PROJECT_NAME}-${SERVICE_NAME}-service sh