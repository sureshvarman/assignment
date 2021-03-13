const {DB, dbFactory, DBInstance} = require("./db");

describe("DB Instance", () => {
    it("Check DB Exists", () => {
        expect(
            dbFactory.getDB(DB.Readings)
        ).toBeInstanceOf(DBInstance);

        expect(
            dbFactory.getDB(DB.PricePlans)
        ).toBeInstanceOf(DBInstance);
    });

    it("DB doesn't exists", () => {
        try {
            expect(
                dbFactory.getDB("Test")
            ).toBeInstanceOf(DBInstance);
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
        }
        
    });
});