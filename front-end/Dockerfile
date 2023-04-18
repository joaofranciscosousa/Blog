FROM node 

WORKDIR /home/node/project

COPY package*.json /home/node/project/

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]