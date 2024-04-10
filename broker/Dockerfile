FROM node:21-alpine

WORKDIR /var/www/html

RUN apk update
RUN apk upgrade 

COPY . .
RUN npm i 
RUN npm i ts-node-dev --save-dev

CMD ["npm", "run", "start:dev"]

