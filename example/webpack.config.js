var path = require('path')
var workspacePath = path.resolve(__dirname, '../')
var examplePath = path.resolve(workspacePath, 'example/src')
var loaderPath = path.resolve(workspacePath, 'index.js')
var nodeModulesPath = path.resolve(workspacePath, 'node_modules')
var distPath = path.resolve(workspacePath, 'example/dist');

module.exports = {
  context: examplePath,
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: distPath
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: loaderPath,
        include: [
          examplePath
        ],
        exclude: [
          nodeModulesPath,
          loaderPath
        ]
      }
    ]
  }
}
