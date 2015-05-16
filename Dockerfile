FROM node:0.10.38

ENV APP_NAME dont-get-board

WORKDIR /var/www

COPY ./package.json /var/www/package.json
RUN npm install

COPY ./src /var/www/src
COPY ./config /var/www/config
COPY ./package.json /var/www/package.json
COPY ./app.js /var/www/app.js
COPY ./newrelic.js /var/www/newrelic.js

CMD ["npm", "start"]