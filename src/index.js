const express = require('express')
const path = require('path')
const app = express()

require("./db/config")
const Product1 = require('./db/Product1');
const Product2 = require('./db/Product2');

const bodyParser = require('body-parser');

var table = require('table');
// to parse the input we get from the html page 
app.use(bodyParser.urlencoded({ extended: false }));

// for the default port we get while hosting
const port = process.env.PORT || 3000;

//to fetch the directory 
app.use(express.static(__dirname));

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + "/MyPage.html", "hi");
    // resp.send("hi");
});

// API to check whether customer is logged in as admin or customer
app.post('/customer', async (req, resp) => {
    var id = req.body.id;
    //var tracking_id = req.params.Id;
    //console.log(tracking_id);
    var password = req.body.password;
    //console.log("form submitted", id);


    if (id === "customer1" && password === "customer1")
        resp.sendFile(__dirname + "/customerfile1.html");
    else if (id == "customer2" && password == "customer2")
        resp.sendFile(__dirname + "/customerfile2.html");
    else if (id == "admin" && password == "admin") {

        // to get the latest updated value
        try {
            let data1 = await Product1.find().sort({ _id: -1 }).limit(1);
            let data2 = await Product2.find().sort({ _id: -1 }).limit(1);
            //let qty = data1.quantity + data2.quantity;
            const [{ quantity: qty1, weight: w1, box_count: bc1 }] = data1;
            const [{ quantity: qty2, weight: w2, box_count: bc2 }] = data2;
            // let value = parseInt(qty1) + parseInt(qty2);

            let qt = qty1 + qty2;
            let wt = w1 + w2;
            let bc = bc1 + bc2;
            console.log(qt, wt, bc);

            const data = [
                ["Item", "Cust1", "Cust2", "Tot"],
                ["qty", qty1, qty2, qt],
                ["wgt", w1, w2, wt],
                ["box", bc1, bc2, bc]
            ]

            let x = table.table(data);
            resp.send(data);
            console.log(x)
        } catch (error) {
            resp.send("Sorry for inconvenience")
        }
    }
    else
        resp.send("Wrong password or name")
});

// API to save the data to customer1 and customer2
app.use(express.json());
app.post('/updated', async (req, resp) => {

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
    resp.send("sucessfully updated")

})

app.listen(port, () => {
    console.log("Server works")
});