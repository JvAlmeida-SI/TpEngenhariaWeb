FROM node:8.17.0

WORKDIR /app
COPY ./package.json ./package-lock.json /app/

RUN npm install
RUN npm install -g @angular/cli@1.7.4

COPY ./ /app

CMD ["ng", "serve", "--host", "0.0.0.0"]