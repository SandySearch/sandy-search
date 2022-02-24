# Dockerfile
# how to use: docker build -t mkobar/sandy-search:0.0.91 .

# how to build tiny production image from:
# https://blog.hasura.io/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4
#
# base image (from 3.99 GB to 657 MB) yay Alpine!
#FROM node:9.4
#FROM beevelop/ionic:latest
FROM node:8.9-alpine

# Set one or more individual labels
LABEL org.sandysearch.name="SandySearch Mobile/Web App"
LABEL org.sandysearch.version="0.0.91"
LABEL org.sandysearch.release-date="2022-02-18"
LABEL org.sandysearch.version.is-production=""
LABEL org.sandysearch.hackathon="Call For Code 2018"

# add git for pull - for npm package
RUN apk add git -U

# required for image build
#RUN apk add python -U
RUN apk add make gcc g++ musl-dev -U
#RUN apk add make g++ musl-dev -U still adds gcc so no savings

# add required libsecret-1-dev, needed by keytar, needed by geofire
#RUN apt-get -V install -y libsecret-1-dev

# add updates for security issues
#RUN apt-get update && apt-get -V install -y \
#   --no-install-recommends \   
#   gnupg \
#   gpgv \
#   libgcrypt20 \
#   openssl \
#   procps \
#   libtomcat8-java \
#   libprocps4 \
#   libssl1.0.0 \
#   libsecret-1-dev \
#   && rm -rf /var/lib/apt/lists/*

# set working directory
WORKDIR /app

# install and cache app dependencies
#COPY package*.json /usr/src/app/
COPY package*.json /app
#ADD package.json /usr/src/app/package.json
RUN npm install

# Bundle app source
COPY . /app

#RUN npm install geofire - DOES NOT WORK in Container?!
COPY ./geofire/ /app/node_modules/geofire/

# Specify port
EXPOSE 8100

# start app
# start with "docker run -it image"
#CMD ["bash"] but alpine has no bash
#CMD ["sh"]

# start with "docker run -d -p 80:8100 --name name image"
# start with "docker run -d -p 80:8100 --name sandy mkobar/sandy-search:0.0.91"
#CMD ["ionic", "serve", "-c", "-s", "-b"]
CMD ["node_modules/.bin/ionic", "serve", "-c", "-s", "-b", "--no-livereload"]

# https://lightsonsoftware.com/developing-ionic-apps-docker-style/
# https://hub.docker.com/r/agileek/ionic-framework/
# https://github.com/agileek/docker
# https://blog.typodrive.com/2017/05/03/build-ionic-in-a-dockerfile/
# https://blog.saddey.net/2016/07/03/using-docker-to-create-ionic-2-pwa-developer-environment/
# https://jpnarowski.com/how-to-publish-an-ionic-android-app-with-docker/
# https://blog.ionicframework.com/docker-hot-code-deploys/
# https://github.com/beevelop/docker-ionic
