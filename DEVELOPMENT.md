# Development

## Installation
```
yarn
```

## Run development environment
The following command will start `webpack-dev-server` and `electron`. `webpack-dev-server` will be ran inside the renderer process. The renderer process will be prepared with:
* HMR
* [React Developer Tools](https://github.com/facebook/react-devtools)
* [Redux DevTools chrome extension](https://github.com/zalmoxisus/redux-devtools-extension)
```
yarn start
```

## Code validation

### Linting
```
yarn lint #both js and style linting
```
or
```
yarn lint:js
```
or
```
yarn lint:style
```

### Unit testing
```
yarn test
```
or
```
yarn test:main
```
or
```
yarn test:renderer
```
or
```
yarn test:renderer --watch
```

## e2e testing
All major features should be covered by e2e tests. e2e tests are ran through [spectron](https://github.com/electron/spectron).
```
yarn e2e
```

## Commiting
Commits are linted with [commitlint](https://github.com/marionebl/commitlint) with [conventional change](https://conventionalcommits.org/) rules. It's easiest to use the following command to commit your changes:
```
yarn git-cz
```
