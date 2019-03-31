const App = require('./src/index')

const app = new App()

app.use(function(req, res, next){
  console.log('resss')
  req.body = {a: 333}
  next()
})
app.use(function(req, res, next) {
  console.log(111)
  res.end(JSON.stringify(req.body))
})

app.listen(8000)