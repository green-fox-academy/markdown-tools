FROM node:10.22.1-alpine

WORKDIR /usr/tools

COPY package.json .
COPY tsconfig.json .
COPY scripts scripts
COPY src src
COPY types types
COPY dictionaries dictionaries
RUN npm install --quiet --unsafe-perm --production

COPY .remarkrc .
COPY .prettierrc .
