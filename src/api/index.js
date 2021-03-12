const express = require('express');

const {DB, dbFactory} = require("../data/db");
const MeterReading = require("../services/meter-readings");
const PricePlans = require("../services/price-plans");

const pricePlanController = require('./price-plans');
const readingController = require('./readings');

const router = express.Router();

module.exports.init = function() {
    const meterReading = new MeterReading(dbFactory.getDB(DB.Readings));
    const pricePlan = new PricePlans(dbFactory.getDB(DB.PricePlans), meterReading);

    router.use('/price-plans', pricePlanController(pricePlan));
    router.use('/readings', readingController(meterReading));

    return router;
}