const port = 3000;

const express = require("express");
const bodyParser = require("body-parser");

app = express();

app.set('view engine', 'ejs');

//  Use "public" directory
app.use(express.static(__dirname + '/public'));

//  Parse the data that comes from the HTML
app.use(bodyParser.urlencoded({extend: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/bmi.html");
});

app.post("/", function(req, res) {
    //  Get the age, weight, and height
    var age = req.body.age;
    var weight = Number(req.body.weight);
    var height = Number(req.body.height) / 100;

    //  Calculate the BMI
    var bmi = weight / (height * height);

    //  Render the result when user submits the form
    res.render('result', {age: age, weight: weight, height:  Math.round(height * 100, 1), bmi: bmi.toFixed(1)});
});

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});