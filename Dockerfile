FROM node:7.10

WORKDIR /app

COPY ./public /app/public
COPY ./src /app/src
COPY ./package.json /app/
COPY ./yarn.lock /app/
COPY ./run.sh /root/

RUN yarn install

CMD yarn start

