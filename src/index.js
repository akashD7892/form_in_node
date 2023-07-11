const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
//mongoose.set('strictQuery', false);

require("./db/config")
const Product1 = require('./db/Product1');
const Product2 = require('./db/Product2');


const bodyParser = require('body-parser');

var table = require('table');
// // to parse the input we get from the html page 
app.use(bodyParser.urlencoded({ extended: false }));

// // for the default port we get while hosting
const port = process.env.PORT || 3000;

// //to fetch the directory 
app.use(express.static(__dirname));

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + "/MyPage.html");
    // resp.send("hi");
});

// // API to check whether customer is logged in as admin or customer
app.post('/customer', async (req, resp) => {
    var id = req.body.id;
    var password = req.body.password;


    if (id === "customer1" && password === "customer1")
        resp.sendFile(__dirname + "/customerfile1.html");
    else if (id == "customer2" && password == "customer2")
        resp.sendFile(__dirname + "/customerfile2.html");
    else if (id == "admin" && password == "admin") {

        // to get the latest updated value
        resp.send("fetched");

    }
    else
        resp.send("Wrong password or name")
});

// // API to save the data to customer1 and customer2
app.use(express.json());
app.post('/updated', async (req, resp) => {

    try {

        let name = req.body.customer;

        if (name === "customer1") {
            let product = new Product1(req.body);
            let result = await product.save();
        }
        else {
            let product = new Product2(req.body);
            let result = await product.save();
        }

        console.log(name);
        resp.send("updated")

    } catch (error) {
        throw error;
    }

})

app.listen(port, () => {
    console.log("Server works")
});