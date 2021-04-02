const express = require('express');
const bodyParser  = require('body-parser');
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine','ejs')

var covidData;

const url = "https://disease.sh/v3/covid-19/countries/india?strict=true&allowNull=false" ;

https.get(url , function(response)
{
var jsonData = '';
response.on("data" , function(data)
{
jsonData += data;
});

response.on("end" , function()
{
covidData = JSON.parse(jsonData);
});

});


app.get('/'  , function(req , res)
{
res.render('index' , {data:covidData});
});



app.listen(process.env.PORT || 3000 , function()
{
  console.log("Server started at port 3000");
});
