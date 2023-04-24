FROM node:16.15.1

WORKDIR /app

COPY . /app/

RUN yarn 
RUN npx sequelize-cli migration:create --name nomemigration

CMD ["npx", "nodemon", "src/server.js"]