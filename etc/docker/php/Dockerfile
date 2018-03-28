FROM php:7.2.3-fpm-alpine

RUN apk add --no-cache --virtual .persistent-deps \
		git \
		icu-libs \
		libpq \
		zlib

RUN set -xe \
	&& apk add --no-cache --virtual .build-deps \
		$PHPIZE_DEPS \
		icu-dev \
		postgresql-dev \
		mysql-dev \
		zlib-dev \
	&& docker-php-ext-install \
		intl \
		pdo_pgsql \
		pdo_mysql \
		zip \
	&& docker-php-ext-enable --ini-name 05-opcache.ini opcache

# GD installation
RUN apk upgrade --update && apk --no-cache add \
    libmcrypt-dev freetype-dev libxpm-dev libjpeg-turbo-dev libvpx-dev \
    libpng-dev libxml2-dev postgresql-dev icu-dev pcre-dev

RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ \
    --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/ \
    --with-xpm-dir=/usr/include/

RUN pecl install xdebug

ENV APCU_VERSION 5.1.11
RUN pecl install apcu-${APCU_VERSION} \
    && docker-php-ext-enable --ini-name 20-apcu.ini apcu

RUN apk del .build-deps

COPY 99-custom.ini /usr/local/etc/php/conf.d/99-custom.ini
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

WORKDIR /app

ENTRYPOINT ["docker-entrypoint"]
CMD ["php-fpm"]

RUN mkdir -p var/cache var/logs var/sessions \
    && chown -R www-data var
