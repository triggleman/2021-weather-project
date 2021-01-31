const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/", (req, res) => {

    const city = req.body.location;
    //console.log(city);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c5aa0e14eede866dbebaaccdeca42c4d&units=imperial`;

    https.get(url, (response) => {
        response.on('data', (data) => {
            //alll the json weather data
            const weather = JSON.parse(data);

            const img = weather.weather[0].icon;
            const imgURL = " http://openweathermap.org/img/wn/" + img + "@2x.png";
            const weatherDegress = weather.main.temp;
            const weatherDiscription = weather.weather[0].description;
            const weatherLocation = weather.name;
            res.write("<h1>The weather in " + weatherLocation + " is " + weatherDegress + " degress</h1>");
            res.write("<p>It is " + weatherDiscription + "</p>");
            res.write("<img src= " + imgURL + ">");
            res.send();
        })
    })

});

app.listen(8080, () => {
    console.log("app is running");
});