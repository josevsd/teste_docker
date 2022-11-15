FROM node 

WORKDIR /src/App.js

COPY package*.json /

RUN npm install

COPY .  .

EXPOSE 3000

CMD ["npm", "start"]