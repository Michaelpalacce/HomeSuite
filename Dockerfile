FROM node:14-alpine as base

RUN npm i -g pm2

#######################################################################################

FROM base as dev

WORKDIR /app