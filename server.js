//npm install hbs@4.0.1 --save

const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3001; //If environment variable Port doesnt exist, set port to 3000
var app = express(); // new express app

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs'); // tells express what view engine we want to use


// Is how you register middleware
app.use((req,res,next) =>{
  var now = new Date().toString();
  //console.log(`${now}: ${req.method} ${req.url}`);
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n' , (err) => {
    if(err){
      console.log('Unable to connect to server');
    }
  });
  next();
});

// Dont use next if, something is not right,
// app.use((req,res,next)=>{
//   res.render('maintanance.hbs')
// });

// Make this private, by executing it after the Express middleware

app.use(express.static(__dirname + '/public'));
 // register a handled for an http get request
 // second argument is the function to run, the function that
 //tells express what to send back to the person that made the request
 // we have handlers for 3 URLS
// app.get('/', (req, res) => {
//   //res.send('<h1>Hello Express</h1>'); // response for the http request
//   res.send({
//     name: 'Levy',
//     likes : [
//       'Cricket',
//       'Sleep'
//     ]
//   })
// });
hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>'); // response for the http request
  res.render('home.hbs',{
    pageTitle: 'Levy',
    welcomeMessage : 'Welcome to my website',
    CurrentYear : new Date().getFullYear()
  });
});
app.get('/about',(req,res) => {
   //res.send('About Page');
   res.render('about.hbs',{
     pageTitle:'About Page'//,
     //CurrentYear: new Date().getFullYear()
   })
});

app.get('/projects',(req,res) => {
   //res.send('About Page');
   res.render('projects.hbs',{
     pageTitle:'Projects'//,
     //CurrentYear: new Date().getFullYear()
   })
});

// bad - send back json with errorMesage
app.get('/bad', (req, res) => {
  res.send({
    errorMesage: 'Unable to handle Request'
  });
})
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
}); // bind our application to a port
