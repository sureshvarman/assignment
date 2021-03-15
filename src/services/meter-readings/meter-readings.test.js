const {DB, dbFactory} = require("../../data/db");

const {DataBaseEntryNotFound} = require("../../utils/error/types");

const MeterReading = require(".");

const meterReading = new MeterReading(dbFactory.getDB(DB.Readings));

const testRecord = {
    smartMeterId: "smart-meter-test",
    electricityReadings: [
        {"time":1605081676,"reading":9.0503},
        {"time":1605168078,"reading":9.0213}
    ]
}

describe("Meter Readings", () => {
    it("Record", () => {
        meterReading.recordReadings(testRecord);
    });

    it("Read", () => {
        const readings = meterReading.getReadings(testRecord.smartMeterId);

        expect(readings).toEqual(testRecord.electricityReadings);
    });

    it ("Record Not Found", () => {
        try {
            meterReading.getReadings("test-not-exists");
        }
        catch(e) {
            expect(e).toBeInstanceOf(DataBaseEntryNotFound);
        }
    });

    it ("average", () => {
        const average = meterReading.average(testRecord.smartMeterId);

        const readings = meterReading.getReadings(testRecord.smartMeterId);

        readings.sort((a, b) => a.time - b.time);
        const seconds = readings[readings.length - 1].time - readings[0].time;
        const hours = Math.floor(seconds / 3600);

        const calcAverage = readings.reduce((prev, next) => prev + next.reading, 0) / readings.length

        expect(average).toEqual(calcAverage/hours)
    });
});