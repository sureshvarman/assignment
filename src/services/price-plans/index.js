const {DB, dbFactory} = require("../../data/db");

class PricePlans {
    constructor() {
        this.pricePlanReadingInstance = dbFactory.getDB(DB.PricePlans);
    }

    _getPricePlans(limit) {
        return this.pricePlanReadingInstance.findAll(limit);
    }

    _usageCost (readings, rate) {
        return readings * rate;
    };

    recommend(averageReadingPerhour, limit) {
        return Object.entries(this._getPricePlans(limit)).map(([key, value]) => {
            return {
                [key]: this._usageCost(averageReadingPerhour, value.rate),
            };
        });
    }
}

module.exports = PricePlans;