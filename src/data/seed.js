const {ElectricityGenerator, MeterGenerator, PricePlansGenerator} = require('./generator');
const {dbFactory, DB} = require('./db');

class ApplicationDataSeed {
    constructor() {
        console.log('Initialized seeding data....');
    }

    run() {
        const readingsGenerate = new ElectricityGenerator();
        const meters = new MeterGenerator().generate();
        const pricePlans = new PricePlansGenerator().generate();

        let readings = [];

        dbFactory.getDB(DB.PricePlans).insert(pricePlans);

        for (const key in meters) {
            if (meters.hasOwnProperty(key)) {
                readings.push({
                    electricityReadings: readingsGenerate.generate(),
                    smartMeterId: meters[key]
                });
            }
        }

        dbFactory.getDB(DB.Readings).insert(readings);
    }
}

module.exports = new ApplicationDataSeed();