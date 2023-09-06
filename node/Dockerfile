FROM node:alpine3.17

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm ci --omit=dev

EXPOSE 3000

CMD [ "node", "index.js" ]
