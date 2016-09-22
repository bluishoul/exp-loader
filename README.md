# exp-loader for Webpack
Enable experiment feature during the building process

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### Webpack Config

```
{
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'exp',
                include: __dirname + '/src',
                exclude: __dirname + '/node_modules',
            }
        ]
    }
}
```

### Use in app

Build specific version of `feature.js`

#### directory structure

```
src
├── feature.1.js
├── feature.js
└── index.js
```
equals to: 
```
src
├── exp
│   └── feature.1.js
├── feature.js
└── index.js
```

#### set Node env variable

```
EXP_VERSION=1 webpack --config webpack.config.js --progress
```

## Run an example

Clone this project, then run those commands:

```
npm install
npm run example
```

then open `example/index.html` in the browser