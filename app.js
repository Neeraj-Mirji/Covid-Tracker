const express = require('express');
const bodyParser  = require('body-parser');
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set('view engine','ejs')

var covidDataToday;
var covidDataYesterday;

const url = "https://disease.sh/v3/covid-19/countries/india?strict=true&allowNull=false" ; // getting todays data
const url1 = 'https://disease.sh/v3/covid-19/countries/india?yesterday=true&twoDaysAgo=false&strict=true&allowNull=false' ; //getting yesterday's data

https.get(url , function(response)
{
var jsonData = '';
response.on("data" , function(data)
{
jsonData += data;
});

response.on("end" , function()
{
covidDataToday = JSON.parse(jsonData);
});

});

https.get(url1 , function(response)
{
var jsonData1 = '';
response.on("data" , function(data)
{
jsonData1 += data;
});

response.on("end" , function()
{
covidDataYesterday = JSON.parse(jsonData1);
});

});


app.get('/'  , function(req , res)
{
res.render('index' , {data:covidDataToday , data1:covidDataYesterday});
});



app.listen(process.env.PORT || 3000 , function()
{
  console.log("Server started at port 3000");
});
