FROM node:16.15-alpine3.14
RUN apk update && apk add bash
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
RUN adduser -S app
COPY ./ .
RUN npm ci
RUN npm i -g prisma@4.5.0
RUN chown -R app /usr/src/app/
USER app
EXPOSE 3000
CMD [ "npm", "run", "start" ]