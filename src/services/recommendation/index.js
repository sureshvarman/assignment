/**
 * Bridge two interfaces to create recommendation engine
 */
class Recommendation {
    constructor(meterReading, pricePlans) {
        this.meterReading = meterReading;
        this.pricePlans =  pricePlans;
    }

    _usageCost (readings, rate) {
        return readings * rate;
    };

    _getMeterAverageReading() {
        if (!this.meterReading) {
            throw new Error("Meter reading missing");
        }

        return this.meterReading.average();
    }

    _compareRecommendedPricePlans(limit) {
        return Object.entries(this.pricePlans.pricePlanByRate(limit)).map(([key, value]) => {
            return {
                [key]: this._usageCost(this._getMeterAverageReading(), value.rate),
            };
        });
    }

    comparePricePlans(limit) {
        return Object.entries(this.pricePlans.getPricePlans(limit)).map(([key, value]) => {
            return {
                [key]: this._usageCost(this._getMeterAverageReading(), value.rate),
            };
        });
    }

    recommend(limit) {
        const priceComparison = this._compareRecommendedPricePlans(limit);

        return priceComparison;
    }
}

module.exports = Recommendation;