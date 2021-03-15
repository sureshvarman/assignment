const {DB, dbFactory} = require("../../data/db");

const PricePlans = require(".");

const pricePlanDB = dbFactory.getDB(DB.PricePlans);

const pricePlansService = new PricePlans(pricePlanDB);

const pricePlanNames = {
    PRICEPLAN0: "price-plan-0",
    PRICEPLAN1: "price-plan-1",
    PRICEPLAN2: "price-plan-2",
};

const supplierNames = {
    DR_EVILS_DARK_ENERGY_ENERGY_SUPPLIER: "Dr Evil's Dark Energy",
    THE_GREEN_ECO_ENERGY_SUPPLIER: "The Green Eco",
    POWER_FOR_EVERYONE_ENERGY_SUPPLIER: "Power for Everyone",
};

const pricePlanData = [
    {
        supplier: supplierNames.DR_EVILS_DARK_ENERGY_ENERGY_SUPPLIER,
        rate: 10,
        pricePlanId: pricePlanNames.PRICEPLAN0
    },
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

describe("Price Plans", () => {

    beforeAll(() => {
        pricePlanDB.insert(pricePlanData);
    });

    it("Read Price Plans", () => {
        expect(Object.keys(pricePlansService.getPricePlans()).length).toEqual(3);
    });

    it("Read price plans by rate", () => {
        const pricePlans = pricePlansService.getPricePlansByRate();
        const pricePlansOrder = Object.keys(pricePlans);

        expect(pricePlansOrder).toEqual([pricePlanNames.PRICEPLAN2, pricePlanNames.PRICEPLAN1, pricePlanNames.PRICEPLAN0]);
    });
});