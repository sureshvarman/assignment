const express = require('express');

const {DB, dbFactory} = require("../data/db");

const MeterReading = require("../services/meter-readings");
const PricePlans = require("../services/price-plans");
const Recommendation = require('../services/recommendation');

const pricePlanController = require('./price-plans');
const readingController = require('./readings');

const router = express.Router();

module.exports.init = function() {
    const meterReading = new MeterReading(dbFactory.getDB(DB.Readings));
    const pricePlan = new PricePlans(dbFactory.getDB(DB.PricePlans));

    const recommendation = new Recommendation(meterReading, pricePlan)

    router.use('/price-plans', pricePlanController(recommendation));
    router.use('/readings', readingController(meterReading));

    return router;
}