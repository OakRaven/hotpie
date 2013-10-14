assert  = require 'assert'
request = require 'request'
app     = require '../../server'

console.log app

describe 'authentication', ->
  describe 'GET /login', ->

    body = null
    before (done) ->
      options =
        uri: "http://localhost:#{app.get('port')}/login"

      request options, (err, response, _body) ->
        body = _body
        done()

    it 'has has title', ->
      assert.hasTag body, '//head/title', 'Hot Pie - Login'