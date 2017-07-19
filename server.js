const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000;
const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')


app.use((req,res,next)=>{
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  })
  next()
})
// app.use((req,res, next)=>{
//   res.render('maintenance')
// })
app.use(express.static(__dirname + '/public'))
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
})

app.get('/',(req,res)=>{
  // res.send('<h1>Hola Mundo</h1>')
  res.render('home',{
    pageTitle:"Home Page",
    pageBody:"Esta es la pagina de Inicio"
    })
})
app.get('/about',(req,res)=>{
  res.render('about',{
    pageTitle:'About Page Injected',
    pageBody:"Bienvendios a la pagina de Acerca de..."
  })
})


app.listen(port,()=>{
  console.log(`Server is up on ${port}`);
})
