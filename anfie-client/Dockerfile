# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV development


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run dev
