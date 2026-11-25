# docker-node-mongo

A small Node.js app that stores each visit in MongoDB, run with Docker and Docker Compose, and deployed to an Azure VM from a private Azure Container Registry. Lab work from week 8 of my Azure and DevOps training.

## Run it
    echo "MONGO_PASSWORD=$(openssl rand -hex 16)" > .env
    docker compose up -d --build
    curl http://localhost:3000/

Mongo Express is on http://localhost:8081 (this PC only).

## How it's built
- Dockerfile: node:24-alpine, dependencies cached in their own layer, runs as the node user, with a healthcheck.
- compose.yaml: app, MongoDB and Mongo Express on their own network; the app waits for MongoDB to be healthy.
- MongoDB's data is in a named volume, so it survives the containers being replaced.
- The password comes from .env, which Git ignores; on Azure it comes from Key Vault.

## On Azure
The image is pushed to Azure Container Registry. My terraform-iac-pipeline repo builds a VM that installs Docker, signs in with its managed identity, pulls the image and the password, and starts the app.

## What I learned
- 
- 
- 
