FROM node:22-alpine as builder
WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:22-alpine as final
WORKDIR /app

COPY --from=builder ./app/dist ./dist

COPY package*.json ./

RUN npm install

EXPOSE 3000
CMD npm start
