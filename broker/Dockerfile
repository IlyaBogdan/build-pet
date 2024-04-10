FROM node:20-alpine

WORKDIR /var/www/html

RUN apk update
RUN apk upgrade 

COPY . .
RUN npm i 
RUN npm i ts-node-dev --save-dev

EXPOSE 3000
CMD ["npm", "run", "start:dev"]

