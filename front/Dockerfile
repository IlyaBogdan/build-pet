FROM node:lts-alpine

#RUN npm install -g http-server

WORKDIR /var/www/html
COPY package.json .

RUN npm install
RUN npm i -g @vue/cli

COPY . .
RUN npm run build

EXPOSE 8080

#CMD [ "http-server", "dist" ]
CMD ["npm", "run", "serve"]