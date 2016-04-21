# react-falcor-demo

This is a working demonstration of [Falcor](http://netflix.github.io/falcor/) and [React](https://facebook.github.io/react/).

## How to run

### Build common lib

```sh
npm install -g typescript browserify
npm install
tsc -p lib
```

### Hello World

```sh
cd demo/hello-world
tsc && browserify -o built/bundle.js built/index.js && open index.html
```

### Inetgrated with flux

```sh
cd demo/simple-flux-app/
tsc && browserify -o built/bundle.js built/index.js && open index.html
```

### Variety of Query

```sh
cd demo/variety-of-query
tsc && browserify -o built/bundle.js built/index.js && open index.html
```
