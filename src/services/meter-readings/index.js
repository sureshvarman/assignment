class MeterReading {
    constructor(dbInstance) {
        this.readingDBInstance = dbInstance;
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
        if (meterId) {
            return this.readingDBInstance.findOne(meterId).electricityReadings;
        }

        return this._parseReadings(this.readingDBInstance.findAll());
    }

    _average(readings) {
        return readings.reduce((prev, next) => prev + next.reading, 0) / readings.length
    }

    _timeElapsedInHours(readings) {
        readings.sort((a, b) => a.time - b.time);
        const seconds = readings[readings.length - 1].time - readings[0].time;
        const hours = Math.floor(seconds / 3600);
        return hours;
    }

    average(meterId) {
        const readings = this.getReadings(meterId);
        const averageReading = this._average(readings);
        const readingHours = this._timeElapsedInHours(readings);

        return averageReading/readingHours;
    }

    recordReadings(readings) {
        this.readingDBInstance.insert(readings);
    }
}

module.exports = MeterReading;