FROM node:alpine As development

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install --only=development

COPY ./ .
#COPY docker .

RUN npm run start

#FROM node:alpine as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY ./package*.json ./