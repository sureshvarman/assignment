class PricePlans {
    constructor(dbInstance, meterReading) {
        this.pricePlanReadingInstance = dbInstance;
        this.meterReading = meterReading;
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

    _getMeterAverageReading() {
        if (!this.meterReading) {
            throw new Error("Meter reading missing");
        }

        return this.meterReading.average();
    }

    comparePricePlans(limit) {
        return Object.entries(this._getPricePlans(limit)).map(([key, value]) => {
            return {
                [key]: this._usageCost(this._getMeterAverageReading(), value.rate),
            };
        });
    }

    recommend(limit) {
        const priceComparison = this.comparePricePlans(limit);
        const pricePlans = this._getPricePlans();

        return priceComparison.sort((a, b) => this._extractCost(a, pricePlans) - this._extractCost(b, pricePlans))
    }
}

module.exports = PricePlans;