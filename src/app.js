
const seed = require("./data/seed");
const {DB, dbFactory} = require("./data/db");

const MeterReading = require("./services/meter-readings");
const PricePlans = require("./services/price-plans");

const meterReading = new MeterReading();
const pricePlan = new PricePlans();

seed.run();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.get("/readings/read/:smartMeterId", (req, res) => {
    res.send(meterReading.getReadings(req.params.smartMeterId));
});

app.post("/readings/store", (req, res) => {
    meterReading.recordReadings(req.body);
    res.send(meterReading.getReadings(req.body.smartMeterId));
});

app.get("/price-plans/recommend/:smartMeterId/:limit?", (req, res) => {
    res.send(pricePlan.recommend(meterReading.averagePerHour(), req.params.limit));
});

app.get("/price-plans/compare-all/:smartMeterId", (req, res) => {
    let result = {
        smartMeterId: req.params.smartMeterId,
        pricePlanComparisons: pricePlan.comparePricePlans(meterReading.averagePerHour())
    }
    res.send(result);
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`🚀 app listening on port ${port}`);
