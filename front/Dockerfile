FROM node:21-alpine

#RUN npm install -g http-server

WORKDIR /var/www/html
COPY package.json .

RUN npm install
RUN npm i -g @vue/cli

COPY . .

#CMD [ "http-server", "dist" ]
CMD ["npm", "run", "serve"]