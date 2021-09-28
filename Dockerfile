FROM node:16.10-alpine

WORKDIR /app

COPY package-lock.json ./
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000
