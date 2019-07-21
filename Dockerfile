FROM node:8.7.0-alpine
ENV HOME=/home/app
ENV NODE_ENV=production
EXPOSE 3003
COPY package.json $HOME/node_docker/
WORKDIR $HOME/node_docker
RUN npm install --silent --progress=false --production
COPY . $HOME/node_docker
CMD [ "npm", "run", "start" ]