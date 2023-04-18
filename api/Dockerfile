FROM node 

WORKDIR /home/node/project

COPY package*.json /home/node/project/

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start.dev"]