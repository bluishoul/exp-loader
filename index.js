var fs = require('fs')
var path = require('path')
var loaderUtils = require('loader-utils')

module.exports = function (content) {
  return content
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  this.cacheable && this.cacheable()
  var query = loaderUtils.parseQuery(this.query)
  var version = process.env.EXP_VERSION
  var expPath = version && getExpPath(remainingRequest, version)
  var requestPath = remainingRequest;
  if (expPath) {
    requestPath = expPath
  }
  var result = [
    'module.exports = ',
    'require(', loaderUtils.stringifyRequest(this, '!!' + requestPath), ');'
  ]
  return result.join('')
}

function generateRelativePathByLevel (level) {
  var dots = []
  for (var i = 0; i < level; i++) {
    dots.push('../')
  }
  return dots.join('')
}

function parseExpPath (p, version, level) {
  var relativePath = generateRelativePathByLevel(level)
  var parsedPath = path.parse(p)
  parsedPath.base = undefined
  parsedPath.name = relativePath + parsedPath.name + '.' + version
  var siblingsPath = path.resolve(path.format(parsedPath))
  if (fs.existsSync(siblingsPath)) {
    return siblingsPath
  }
  parsedPath.name = relativePath + 'exp/' + parsedPath.name
  var siblingsDirPath = path.resolve(path.format(parsedPath))
  if (fs.existsSync(siblingsDirPath)) {
    return siblingsDirPath
  }
  return null
}

function getExpPath (p, version) {
  var level = 0
  var expPath = null
  do {
    expPath = parseExpPath(p, version, level)
  } while (!expPath && ++level <= 10)

  return fs.existsSync(p) ? expPath : null
}
