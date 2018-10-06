# base image
#FROM node:9.4
FROM beevelop/ionic:latest

# add required libsecret-1-dev, needed by keytar, needed by geofire
#RUN apt-get -V install -y libsecret-1-dev

# add updates for security issues
RUN apt-get update && apt-get -V install -y \
   gnupg \
   gpgv \
   libgcrypt20 \
   openssl \
   procps \
   libtomcat8-java \
   libprocps4 \
   libssl1.0.0 \
   libsecret-1-dev \
   && rm -rf /var/lib/apt/lists/*

# Bundle app source
COPY . /app

# set working directory
WORKDIR /app

# install and cache app dependencies
#COPY package*.json /usr/src/app/
#ADD package.json /usr/src/app/package.json
RUN npm install

#RUN npm install geofire - DOES NOT WORK in Container?!
COPY ./node_modules/geofire/ /app/node_modules/geofire/

# Specify port
EXPOSE 8100

# start app
# start with "docker run -it image"
CMD ["bash"]
#CMD ["ionic", "serve", "-c", "-s", "-b"]
#CMD ["ionic", "serve", "-c", "-s", "-b", "--nolivereload"]

# https://lightsonsoftware.com/developing-ionic-apps-docker-style/
# https://hub.docker.com/r/agileek/ionic-framework/
# https://github.com/agileek/docker
# https://blog.typodrive.com/2017/05/03/build-ionic-in-a-dockerfile/
# https://blog.saddey.net/2016/07/03/using-docker-to-create-ionic-2-pwa-developer-environment/
# https://jpnarowski.com/how-to-publish-an-ionic-android-app-with-docker/
# https://blog.ionicframework.com/docker-hot-code-deploys/
# https://github.com/beevelop/docker-ionic
