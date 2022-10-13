FROM node:14-slim

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY lib ./lib
CMD [ "node", "lib/server/index.js" ]