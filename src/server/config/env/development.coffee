config = {}

config.express =
  scheme: 'http'
  host: 'localhost'
  port: 3000
  url: (path)->
    this.scheme + '://' + this.host + ':' + this.port + (path || '')
  tokenExpiresInMinutes: 60

module.exports = config
