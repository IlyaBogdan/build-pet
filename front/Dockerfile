FROM node:19-alpine

WORKDIR /var/www/html

COPY package*.json .

RUN npm install --silent @vue/cli @vue/cli-service @vue/cli-plugin-babel @vue/cli-plugin-eslint
RUN npm install --silent

COPY . .

RUN npm rebuild node-sass

EXPOSE 8080