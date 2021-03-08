/**
 * Calculating readings average, if 10 readings are out there, we will consider sumOf(10..)/10
 * @param {Array<Reading>} readings 
 * @returns 
 */
const average = (readings) => {
    return (
        readings.reduce((prev, next) => prev + next.reading, 0) /
        readings.length
    );
};

/**
 * Time elapsed between first and last readings in the database
 * @param {Array<Reading>} readings 
 * @returns 
 */
const timeElapsedInHours = (readings) => {
    readings.sort((a, b) => a.time - b.time);
    const seconds = readings[readings.length - 1].time - readings[0].time;
    const hours = Math.floor(seconds / 3600);
    return hours;
};

/**
 * readings per hour
 * @param {Array<Reading>} readings 
 * @returns 
 */
const usage = (readings) => {
    return average(readings) / timeElapsedInHours(readings);
};

/**
 * To calculate usage cost per hour
 * @param {Array<Reading>} readings 
 * @param {Number} rate 
 * @returns 
 */
const usageCost = (readings, rate) => {
    return usage(readings) * rate;
};

/**
 * Calculates usage for all the available price plans
 * @param {Array<Reading>} pricePlans 
 * @param {Number} readings 
 * @returns 
 */
const usageForAllPricePlans = (pricePlans, readings) => {
    return Object.entries(pricePlans).map(([key, value]) => {
        return {
            [key]: usageCost(readings, value.rate),
        };
    });
};

module.exports = {
    average,
    timeElapsedInHours,
    usage,
    usageCost,
    usageForAllPricePlans,
};
