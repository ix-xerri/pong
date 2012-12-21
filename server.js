//This will be a node server
var express = require('express');
var app = express();


app.use(express.static('public'));
app.use(function(err, req, res, next){
  res.send(500, 'Something broke!');
});


app.listen(process.env.PORT || 3000);
console.log("You can open http://localhost:3000/ in your browser");