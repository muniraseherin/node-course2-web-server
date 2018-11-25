const express= require('express');
const hbs= require('hbs');
const fs= require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n');
  next();
});
hbs.registerHelper('getCurrentYear', ()=>{
   //return 'test';
  return new Date().getFullYear();
});

hbs.registerHelper('uppercase', (text) =>{
  return text.toUpperCase();
})

app.get('/', (req,res)=> {
  res.render('home.hbs',{
    pageTitle:'home page',
    welcome: 'welcome to website'

  });
});

app.get('/about', (req,res)=> {
  res.render('about.hbs',{
    pageTitle:'about page'
  });
});
app.listen(3000);
