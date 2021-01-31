const express = require('express');
const app = express();
const https = require('https');

app.get("/", (req, res) => {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=houston&appid=c5aa0e14eede866dbebaaccdeca42c4d&units=imperial"

    https.get(url, (response) => {
        console.log(response);
    })
});

app.listen(8080, () => {
    console.log("app is running");
});