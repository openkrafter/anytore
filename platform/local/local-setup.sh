#!/bin/sh

docker build --build-arg VITE_ANYTORE_BACKEND_SERVER=http://localhost:8082 -t anytore/frontend:latest .
docker-compose -f platform/local/docker-compose.yml up -d
