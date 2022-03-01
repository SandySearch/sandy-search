# Dockerfile
# how to use: docker build -t mkobar/sandy-search:0.0.9 .

# how to build tiny production image from:
# https://blog.hasura.io/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4
#
# base image (from 3.99 GB to 657 MB) yay Alpine!
#FROM node:9.4
#FROM beevelop/ionic:latest
#FROM node:8.9-alpine worked in 2019!
#
#FROM node:17-alpine
#FROM node:16-alpine - compiles but fails during npm install on karma - only goes to 8
#FROM node:16.14.0-alpine - still get ERR_SOCKET_TIMEOUT? from npm?
#FROM node:15-alpine - compile fails during build 15.14.0
#FROM node:14-alpine - compile fails during build 14.19.0
#FROM node:13-alpine - compile fails during build
#FROM node:12.22-alpine
#FROM node:12-alpine - compile fails during build 12.22.10
#FROM node:11-alpine - compile fails during build
#FROM node:10-alpine
#FROM node:10.18-alpine - compiles but fails during run on events.d.ts
#FROM node:9-alpine - compiles but fails during run on events.d.ts
#FROM node:8.17.0-alpine - compile fails during build
#FROM node:8.16-alpine - compiles but fails during run on events.d.ts
#FROM node:8.15-alpine - compiles but fails during run on events.d.ts
#FROM node:8.14-alpine - compiles but fails during run on events.d.ts
#FROM node:8.13-alpine - compiles but fails during run on events.d.ts
#FROM node:8.12-alpine - compiles but fails during run on events.d.ts
#FROM node:8.11-alpine - compiles but fails during run on events.d.ts
#FROM node:8.11.2-alpine - compiles but fails during run on events.d.ts
FROM node:8.11.1-alpine
#FROM node:8.10-alpine - compiles but fails during run on events.d.ts
#FROM node:8.9-alpine - compiles but fails during run on events.d.ts

# Set one or more individual labels
LABEL org.sandysearch.name="SandySearch Mobile/Web App"
LABEL org.sandysearch.version="0.0.9"
LABEL org.sandysearch.release-date="2022-02-28"
LABEL org.sandysearch.version.is-production=""
LABEL org.sandysearch.hackathon="Call For Code 2018"

# add git for pull - for npm package
RUN apk add git -U

# required for image build
#RUN apk add python2 -U
RUN apk add make gcc g++ musl-dev -U
#RUN apk add make g++ musl-dev -U still adds gcc so no savings
RUN apk add libsecret-dev -U
#needed by geofire in 8.11.2 and 8.11.1

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
COPY package*.json /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . . should be explicit!
COPY . /app

#RUN npm install geofire - DOES NOT WORK in Container?!
COPY ./geofire/ /app/node_modules/geofire/

# Specify port
EXPOSE 8100

# start app
# start with "docker run -it image sh"
#CMD ["sh"]

# start with "docker run -d -p 80:8100 --name name image"
# start with "docker run -d -p 80:8100 --name sandy mkobar/sandy-search:0.0.9"
#CMD ["ionic", "serve", "-c", "-s", "-b"]
#CMD ["node_modules/.bin/ionic", "serve", "-c", "-s", "-b", "--no-livereload"]
CMD ["node_modules/.bin/ionic-app-scripts", "serve", "-c", "-s", "-b", "--no-livereload"]

# https://lightsonsoftware.com/developing-ionic-apps-docker-style/
# https://hub.docker.com/r/agileek/ionic-framework/
# https://github.com/agileek/docker
# https://blog.typodrive.com/2017/05/03/build-ionic-in-a-dockerfile/
# https://blog.saddey.net/2016/07/03/using-docker-to-create-ionic-2-pwa-developer-environment/
# https://jpnarowski.com/how-to-publish-an-ionic-android-app-with-docker/
# https://blog.ionicframework.com/docker-hot-code-deploys/
# https://github.com/beevelop/docker-ionic
