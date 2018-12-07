# use node for base image
FROM node:10.14.1

# update system
RUN apt-get update
RUN apt-get -y install nodejs

# create and set working directory
WORKDIR /app
ADD . /app

# copy package.json install dependencies using cache for efficiency
COPY package.json /tmp/package.json
RUN cd /app/src && npm install
RUN cd /app/src && npm install express expressjs firebase react react-dom react-image-upload react-images-upload react-router react-router-dom react-scripts


# expose port 80 -- localhost:3000
EXPOSE 80

# start web application
CMD ["npm", "start", "--prefix /app/src"]
