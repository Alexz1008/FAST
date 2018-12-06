# base image
FROM node:8.12.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install firebase
RUN npm install expressjs
RUN npm install react-router
RUN npm install react-router-dom
RUN npm install react-images-upload

# start app
CMD ["npm", "start"]