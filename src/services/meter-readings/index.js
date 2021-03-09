const {DB, dbFactory} = require("../../data/db");

class MeterReading {
    constructor() {
        this.readingDBInstance = dbFactory.getDB(DB.Readings);
    }

    _parseReadings(meterReadings) {
        return Object.keys(meterReadings).map((key) => {
            return meterReadings[key].electricityReadings;
        }).reduce((prev, next) => prev.concat(next.reading), []);
    }

    getReadings(meterId) {
        return this.readingDBInstance.findOne(meterId).electricityReadings;
    }

    average() {
        const readings = this._parseReadings(this.readingDBInstance.findAll());
        return readings.reduce((prev, next) => prev + next.reading, 0) / readings.length
    }

    timeElapsedInHours() {
        const readings = this._parseReadings(this.readingDBInstance.findAll());
        readings.sort((a, b) => a.time - b.time);
        const seconds = readings[readings.length - 1].time - readings[0].time;
        const hours = Math.floor(seconds / 3600);
        return hours;
    }

    recordReadings(readings) {
        this.readingDBInstance.insert(readings);
    }
}

module.exports = new MeterReading();