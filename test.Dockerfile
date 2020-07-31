FROM node:14.7.0-alpine

RUN chmod -R a+w /usr/local/lib/
RUN chmod -R a+w /usr/local/bin/

CMD npm run build && npm run e2e


