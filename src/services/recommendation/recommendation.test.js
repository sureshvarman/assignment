const {DB, dbFactory} = require("../../data/db");
const {DataBaseEntryNotFound} = require("../../utils/error/types");

const PricePlans = require("../price-plans");
const MeterReading = require("../meter-readings");

const Recommendation = require("./");

const pricePlanDB = dbFactory.getDB(DB.PricePlans);
const meterReadingDB = dbFactory.getDB(DB.Readings);

const pricePlanService = new PricePlans(pricePlanDB);
const meterReadingService = new MeterReading(meterReadingDB);

const recommendationService = new Recommendation(meterReadingService, pricePlanService);

const pricePlanNames = {
    PRICEPLAN0: "price-plan-0",
    PRICEPLAN1: "price-plan-1",
    PRICEPLAN2: "price-plan-2",
};

const supplierNames = {
    DR_EVILS_DARK_ENERGY_ENERGY_SUPPLIER: "Dr Evil's Dark Energy",
    THE_GREEN_ECO_ENERGY_SUPPLIER: "The Green Eco"
};

const pricePlanData = [
    {
        supplier: supplierNames.POWER_FOR_EVERYONE_ENERGY_SUPPLIER,
        rate: 2,
        pricePlanId: pricePlanNames.PRICEPLAN1
    },
    {
        supplier: supplierNames.THE_GREEN_ECO_ENERGY_SUPPLIER,
        rate: 1,
        pricePlanId: pricePlanNames.PRICEPLAN2
    },
];

const testReading = {
    smartMeterId: "smart-meter-test",
    electricityReadings: [
        {"time":1605081676,"reading":9.0503},
        {"time":1605168078,"reading":9.0213}
    ]
}

describe("Price Plans", () => {

    beforeAll(() => {
        pricePlanDB.insert(pricePlanData);
        meterReadingDB.insert(testReading);
    });

    it("Compare all", () => {
        const recommended = recommendationService.comparePricePlans(testReading.smartMeterId);
        const average = meterReadingService.average(testReading.smartMeterId);

        const recommendedPricePlans = pricePlanData.map((pricePlan) => {
            return {[pricePlan.pricePlanId]: average * pricePlan.rate};
        });

        expect(recommendedPricePlans).toEqual(recommended);
    });

    it("Recommend", () => {
        const recommended = recommendationService.recommend(testReading.smartMeterId);
        const average = meterReadingService.average(testReading.smartMeterId);

        const recommendedPricePlans = pricePlanData.sort((a, b) => a.rate-b.rate).map((pricePlan) => {
            return {[pricePlan.pricePlanId]: average * pricePlan.rate};
        });

        expect(recommended).toEqual(recommendedPricePlans);
    });

    it("Not Found", () => {
        try {
            const recommended = recommendationService.recommend("unknown-meter-id");
        }
        catch(e) {
            expect(e).toBeInstanceOf(DataBaseEntryNotFound);
        }
    })
});