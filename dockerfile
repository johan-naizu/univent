FROM node:20

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
