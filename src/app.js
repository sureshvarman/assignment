
const seed = require("./data/seed");
const {DB, dbFactory} = require("./data/db");

const MeterReading = require("./services/meter-readings");
const PricePlans = require("./services/price-plans");

const meterReading = new MeterReading();
const pricePlan = new PricePlans();

seed.run();

// print = (data) => console.log(JSON.stringify(data));

// print(dbFactory.getDB(DB.Readings).findOne('smart-meter-0').electricityReadings.length);

// dbFactory.getDB(DB.Readings).insert({electricityReadings: [{time:1607686125,reading:0.8077110525283921}], smartMeterId: "smart-meter-0"});

// print(dbFactory.getDB(DB.Readings).findOne('smart-meter-0').electricityReadings.length);



const express = require("express");
const bodyParser = require("body-parser");
// // const { readings } = require("./readings/readings");
// // const { readingsData } = require("./readings/readings.data");
// // const { read, store } = require("./readings/readings-controller");
// // const { recommend, compare } = require("./price-plans/price-plans-controller");

const app = express();
app.use(bodyParser.json());

// // const { getReadings, setReadings } = readings(readingsData);

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

// app.get("/price-plans/compare-all/:smartMeterId", (req, res) => {
//     res.send(compare(getReadings, req));
// });

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`🚀 app listening on port ${port}`);
