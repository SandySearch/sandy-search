# base image
#FROM node:9.4
FROM beevelop/ionic:latest

# add updates for security issues
RUN apt-get update && apt-get -V install -y \
   gnupg \
   gpgv \
   libgcrypt20 \
   openssl \
   procps \
   libtomcat8-java \
   && rm -rf /var/lib/apt/lists/*

# Bundle app source
COPY . /app

# set working directory
WORKDIR /app

# install and cache app dependencies
#COPY package*.json /usr/src/app/
#ADD package.json /usr/src/app/package.json
RUN npm install

# Specify port
EXPOSE 8100

# start app
# start with "docker run -it image"
CMD ["bash"]
#CMD ["ionic", "serve", "-c", "-s"]

