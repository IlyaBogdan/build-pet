FROM node:21-alpine

WORKDIR /var/www/html

RUN apk update
RUN apk upgrade 

COPY package*.json .

RUN npm i 

COPY . .
