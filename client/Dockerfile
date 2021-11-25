FROM node:16-alpine

WORKDIR /home/app/client

ENV PATH /home/app/client/node_modules/.bin:$PATH

COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 3000