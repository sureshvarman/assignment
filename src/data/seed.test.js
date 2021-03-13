const seed = require("./seed");
const {DB, dbFactory} = require("./db");

describe("generate data", () => {
    beforeAll(() => {
        seed.run();
    });

    it("should generate readings", () => {
        expect(
            Object.keys(dbFactory.getDB(DB.Readings).findAll()).length
        ).toBeGreaterThan(0);
    });

    it("should generate price plans", () => {
        expect(
            Object.keys(dbFactory.getDB(DB.PricePlans).findAll()).length
        ).toBeGreaterThan(0);
    });

    // after all, can clean up the db data
});