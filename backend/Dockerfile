FROM php:8.1.0-fpm-alpine

RUN apk add --no-cache curl build-base zlib-dev oniguruma-dev autoconf bash

ARG PUID=1000
ARG PGID=1000
RUN apk --no-cache add shadow && \
    groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} -g www-data www-data

WORKDIR /var/www
COPY . .

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

CMD php-fpm
EXPOSE 9000