const { pricePlans } = require("./price-plans");
const { usageForAllPricePlans } = require("../usage/usage");

/**
 * to recommend price plans for the given readings in ascending order
 * @param {Function} getReadings 
 * @param {Express.Request} req 
 * @returns 
 */
const recommend = (getReadings, req) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter)).sort((a, b) => extractCost(a) - extractCost(b))
    if("limit" in req.query) {
        return pricePlanComparisons.slice(0, req.params.limit);
    }
    return pricePlanComparisons;
};

/**
 * Function to extract cost from the given price plan readings
 * @param {Object} cost 
 * @returns 
 */
const extractCost = (cost) => {
    const [, value] = Object.entries(cost).find( ([key]) => key in pricePlans)
    return value
}

/**
 * Function to compare the price plans
 * @param {Function} getData 
 * @param {Express.Request} req 
 * @returns 
 */
const compare = (getData, req) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getData(meter));;
    return {
        smartMeterId: req.params.smartMeterId,
        pricePlanComparisons,
    };
};

module.exports = { recommend, compare };
