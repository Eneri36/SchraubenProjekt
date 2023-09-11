FROM alpine:latest

WORKDIR /app

COPY package*.json .

RUN apk add --update nodejs npm
RUN apk add --update npm
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]