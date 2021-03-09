const {DB, dbFactory} = require("../../data/db");

class PricePlans {
    constructor() {
        this.pricePlanReadingInstance = dbFactory.getDB(DB.PricePlans);
    }

    _getPricePlans() {
        return this.pricePlanReadingInstance.findAll();
    }

    _usageCost (readings, rate) {
        return readings * rate;
    };

    recommend(averageReading) {
        return Object.entries(this._getPricePlans()).map(([key, value]) => {
            return {
                [key]: this._usageCost(averageReading, value.rate),
            };
        });
    }
}