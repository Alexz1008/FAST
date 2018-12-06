# use node for base image
FROM node:10.14.1

# update system
RUN apt-get update
RUN apt-get -y install nodejs

# copy package.json install dependencies using cache for efficiency
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cd /tmp && npm install express expressjs firebase react react-dom react-image-upload react-images-upload react-router react-router-dom react-scripts
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# create and set working directory
WORKDIR /app
COPY . /app

# expose port 80 -- localhost
EXPOSE 80

# start web application
CMD ["npm", "start"]
