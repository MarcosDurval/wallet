FROM   node:16.14.2-alpine3.14 AS build

WORKDIR /front

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.16.0-alpine AS prod

COPY --from=build /front/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx-debug", "-g", "daemon off;"]