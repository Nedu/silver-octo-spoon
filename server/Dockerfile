FROM node:16-alpine
WORKDIR /home/app/server
ENV PATH /home/app/api/node_modules/.bin:$PATH

COPY package*.json ./
RUN yarn install

COPY . .
EXPOSE 5000
