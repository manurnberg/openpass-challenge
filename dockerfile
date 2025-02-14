FROM node:21-alpine3.19

WORKDIR /usr/src/app

RUN npm install -g npm@10.8.2

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000