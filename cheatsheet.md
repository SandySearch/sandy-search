## Cheatsheet for Sandy-Search

# How to build & Run

Due to grpc limitations, Node 8.11.1 must be used (with npm 5.x)

```
nvm use 8.11.1
npm install
npm serve
```
## Other actions

```
Lifecycle scripts included in SandySearch:
  start
    ng serve
  test
    ng build && ng test

available via `npm run-script`:
  clean2
    ionic-app-scripts clean
  build
    firebase use sandy-search && ng build --env=dev
  lint2
    ionic-app-scripts lint
  ionic:build
    ionic-app-scripts build
  ionic:serve
    ionic-app-scripts serve
  ng
    ng
  build-demo
    firebase use sandy-demo && ng build --env=dev
  build-prod
    firebase use ssearch-prod && ng build --env=prod
  clean
    rimraf dist/* && npm run clean2
  lintold
    ng lint
  lint
    npm run lintjs && npm run lintmd
  lintfix
    standard --fix --verbose "src/**/*.ts" | snazzy
  lintjs
    standard --verbose "src/**/*.ts" | snazzy
  lintmd
    standard --plugin markdown --verbose '**/*.md' | snazzy
  e2e
    ng e2e
  _format
    https://github.com/beautify-web/js-beautify/issues/1162
  formatcss
    glob-run css-beautify -r src/app/**/*.css
  formatcss2
    glob-run css-beautify -r src/*.css
  formathtml
    glob-run html-beautify -r src/**/*.html
  format
    npm run formathtml && npm run formatcss & npm run formatcss2
  retire
    retire --package
  security
    npm run retire && npm run snyk
  snyk
    snyk test
  commitlint-travis
    commitlint-travis
  semantic-release
    semantic-release
  travis-deploy-once
    travis-deploy-once
  fbserve
    npm run lint && npm run build && firebase serve
  fbserve-demo
    npm run lint && npm run build-demo && firebase serve
  fbserve-prod
    npm run lint && npm run build-prod && firebase serve
  fbdeploy
    npm run build && firebase use sandy-search && firebase deploy
  fbdeploy-demo
    npm run build && firebase use sandy-demo && firebase deploy
  fbdeploy-prod
    npm run build-prod && firebase use ssearch-prod && firebase deploy --only hosting
  fbusedev
    firebase use sandy-search
  fbusedemo
    firebase use sandy-demo
  fbuseprod
    firebase use ssearch-prod
```


