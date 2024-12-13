FROM node:8.17.0

WORKDIR /app
COPY ./package.json ./package-lock.json /app/

RUN npm install && npm install -g @angular/cli@1.7.4

COPY ./ /app

CMD ["npm", "start"]