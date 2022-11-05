FROM node:16.15-alpine3.14
RUN apk update && apk add bash
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY ./ .
RUN npm ci
RUN npm i -g prisma
RUN chown -R app /opt/app
USER app
EXPOSE 3000
CMD [ "npm", "run", "start" ]