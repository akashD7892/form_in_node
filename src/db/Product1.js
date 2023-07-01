const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    order_date: String,
    company: String,
    owner: String,
    item: String,
    quantity: Number,
    weight: Number,
    request_for_shipment: String,
    tracking_id: String,
    ship_l: Number,
    ship_b: Number,
    ship_h: Number,
    box_count: Number,
    specification: String,
    checklist_quantity: String

});

module.exports = mongoose.model("product1", productSchema)