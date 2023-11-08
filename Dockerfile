FROM node:18.18.1-slim AS builder
RUN ["mkdir","app"]
COPY ./src ./app/src
COPY ./public ./app/public
COPY package.json ./app/package.json
COPY package-lock.json ./app/package-lock.json
WORKDIR /app
RUN npm i
RUN ["npm","run","build"]
# ENTRYPOINT [ "npm","start" ]

FROM nginx
RUN ["rm","-rf","/usr/share/nginx/app/*"]

COPY ./default.conf /etc/nginx/conf.d/p.conf
COPY --from=builder /app/build /usr/share/nginx/app
EXPOSE 3000

