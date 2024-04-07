FROM node:lts-alpine

WORKDIR /var/www/html

COPY package*.json ./
RUN npm i
RUN npm i ts-node-dev --save-dev
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]