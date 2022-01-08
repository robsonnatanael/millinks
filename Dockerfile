FROM node:16.13.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN yarn install
RUN yarn run build

COPY . /usr/src/app/

EXPOSE 3000
CMD [ "yarn", "start" ]
