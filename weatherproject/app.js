const { response } = require("express");
const express =require("express")
const https =require("https");
const { parse } = require("querystring");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
 
    res.sendFile(__dirname + "/index.html");
      
  });

  app.post("/",function(req,res)
  {
    
    const query=req.body.cityName;
 const apikey="";
 const unit="metric";
 
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+ apikey+"&units="+unit+""
    https.get(url,function(response)
    {
      

     
      response.on("data", function(data)
      {
        const weatherdata=JSON.parse(data)
        const temp=weatherdata.main.temp;
        const des= weatherdata.weather[0].description;
        const icon=weatherdata.weather[0].icon
        const imageURL="http://openweathermap.org/img/wn/"+icon +"@2x.png"
       
        res.write("<p> The weather is currently "+ des +"<p>");
        res.write("<h1>The temperature of "+ query+" is"+ temp + " degree celcius</h1>");
        res.write("<img src="+ imageURL +">");
        res.send();
      })

      

    })
    
  })





app.listen(port=3000,function()
{
  console.log("This server is started on port 3000");
});



