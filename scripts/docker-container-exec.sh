#/bin/sh
SERVICE_NAME=$1

echo ${SERVICE_NAME}
docker exec -it ${SERVICE_NAME} sh

