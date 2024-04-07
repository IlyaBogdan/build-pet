FROM node:lts-alpine

WORKDIR /var/www/html

COPY package*.json ./
RUN npm i
RUN npm install -g @vue/cli
COPY . .

EXPOSE 80
CMD [ "npm", "run", "serve" ]