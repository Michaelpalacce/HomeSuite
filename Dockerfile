FROM node:14-alpine as base

RUN npm i -g pm2

#######################################################################################

FROM base as backend-dev

WORKDIR /app

#######################################################################################

FROM base as notes-dev

WORKDIR /app