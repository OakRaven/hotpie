helpers = (app) ->

  app.use (req, res, next) ->
    res.locals.flash = req.flash()
    next()

module.exports = helpers