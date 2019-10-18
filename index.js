const express = require('express');
const app = express();
const request = require('request');
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser")
const https = require('https');

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));
var port = process.env.PORT || process.env.port || 5000;
app.set("port", port);
app.use(bodyParser.json());

app.get('/sel',(req,res)=>{
    res.render('select');
});
app.listen(app.get("port"), () => {
    console.log("[app.listen]Node app is running on port", app.get("port"));
  });
  
  module.exports = app;

app.get("/", (req, res) => {
    let data = req.body;
    //let startTime = data.queryResult.parameters.startTime;
    //let endTime = data.queryResult.parameters.endTime;

    let propertiesObject = {
        q : "global_landslide_nowcast_3hr",
        lat : 23,
        lon : 121,
        limit : 1,
        startTime : "2019-09-01",
        endTime : "2019-09-01",
    };
    request(
      {
        uri: "https://pmmpublisher.pps.eosdis.nasa.gov/opensearch?",
        json: true,
        qs: propertiesObject,
      },
      function(error, response, body) {
        //console.log("[queryDate] "+queryDate);
        console.log(body.items)
        //console.log(response.statusCode)
        //console.log("[response] " + response)
        //console.log(JSON.stringify(response.request.uri.href))
        //res.json({imageUri:body.items[0].image[0].url})
        res.render('home',{"imageUri":body.items[0].image[0].url})
      }
    );
  });