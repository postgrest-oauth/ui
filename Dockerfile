FROM node:alpine

WORKDIR /app

COPY ./public /app/public
COPY ./src /app/src
COPY ./package.json /app/
COPY ./yarn.lock /app/
COPY ./.env /app/

RUN yarn install
CMD yarn start
