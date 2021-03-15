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

    _getMeterAverageReading(meterId) {
        if (!this.meterReading) {
            throw new Error("Meter reading missing");
        }

        return this.meterReading.average(meterId);
    }

    _compareRecommendedPricePlans(meterId, limit) {
        return Object.entries(this.pricePlans.getPricePlansByRate(limit)).map(([key, value]) => {
            return {
                [key]: this._usageCost(this._getMeterAverageReading(meterId), value.rate),
            };
        });
    }

    comparePricePlans(meterId, limit) {
        return Object.entries(this.pricePlans.getPricePlans(limit)).map(([key, value]) => {
            return {
                [key]: this._usageCost(this._getMeterAverageReading(meterId), value.rate),
            };
        });
    }

    recommend(meterId, limit) {
        const priceComparison = this._compareRecommendedPricePlans(meterId, limit);

        return priceComparison;
    }
}

module.exports = Recommendation;