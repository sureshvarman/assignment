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

    _extractCost (cost, pricePlans) {
        const [, value] = Object.entries(cost).find( ([key]) => key in pricePlans)
        return value
    }

    comparePricePlans(averageReadingPerhour, limit) {
        return Object.entries(this._getPricePlans(limit)).map(([key, value]) => {
            return {
                [key]: this._usageCost(averageReadingPerhour, value.rate),
            };
        });
    }

    recommend(averageReadingPerhour) {
        const priceComparison = this.comparePricePlans(averageReadingPerhour);
        const pricePlans = this._getPricePlans();

        return priceComparison.sort((a, b) => this._extractCost(a, pricePlans) - this._extractCost(b, pricePlans))
    }
}

module.exports = PricePlans;