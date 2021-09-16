FROM node:alpine As development

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install --only=development

COPY ./dist .

CMD [ "node", "/usr/src/app/src/main.js" ]

#FROM node:alpine as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY ./package*.json ./