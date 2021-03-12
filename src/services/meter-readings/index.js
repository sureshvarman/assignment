const {DB, dbFactory} = require("../../data/db");

class MeterReading {
    constructor() {
        this.readingDBInstance = dbFactory.getDB(DB.Readings);
    }

    _parseReadings(meterReadings) {
        return Object.keys(meterReadings).map((key) => {
            return meterReadings[key].electricityReadings;
        }).reduce((prev, next) => {
            prev = prev.concat(next);
            return prev;
        }, []);
    }

    getReadings(meterId) {
        return this.readingDBInstance.findOne(meterId).electricityReadings;
    }

    _average() {
        const readings = this._parseReadings(this.readingDBInstance.findAll());
        console.log(readings);
        return readings.reduce((prev, next) => prev + next.reading, 0) / readings.length
    }

    averagePerHour() {
        const averageReading = this.average();
        const readingHours = this.timeElapsedInHours();

        return averageReading/readingHours;
    }

    _timeElapsedInHours() {
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

module.exports = MeterReading;