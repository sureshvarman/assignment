class PricePlans {
    constructor(dbInstance) {
        this.pricePlanReadingInstance = dbInstance;
    }

    getPricePlans(limit) {
        return this.pricePlanReadingInstance.findAll(limit);
    }

    pricePlanByRate(limit) {
        const pricePlans = this.pricePlanReadingInstance.findAll();
        const recommendedPrices = Object.entries(pricePlans).sort(([,prev],[,next]) => prev.rate-next.rate).slice(0, limit)
        .reduce((r, [key, value]) => ({ ...r, [key]: value }), {});

        return recommendedPrices;
    }
}

module.exports = PricePlans;