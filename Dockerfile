FROM node:10.1.0-alpine

WORKDIR /usr/tools

COPY package.json .
COPY scripts scripts
COPY dictionaries dictionaries
RUN npm install --quiet --unsafe-perm --production

COPY .remarkrc .
