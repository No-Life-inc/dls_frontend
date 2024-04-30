# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

ARG REACT_APP_AUTHURL
ARG REACT_APP_GRAPHQLURL
ARG REACT_APP_WRITEAPIURL

ENV REACT_APP_AUTHURL=$REACT_APP_AUTHURL
ENV REACT_APP_GRAPHQLURL=$REACT_APP_GRAPHQLURL
ENV REACT_APP_WRITEAPIURL=$REACT_APP_WRITEAPIURL

# Build the React app
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Serve the build directory on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]