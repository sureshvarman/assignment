class DBInstance {
    constructor(data, idColumn) {
        this._initialize();
        this.idColumn = idColumn || 'id';

        this._store(data);
    }

    _initialize() {
        this.indexData = {};
        this.data = [];
    }

    _isValid(data) {
        if (data && data.length > 0) {
            for (let record of data) {
                if (record[this.idColumn] === undefined) {
                    return false;
                }
            }
        }

        return true;
    }

    _indexData(data) {
        this.indexData = data.reduce((acc, d) => {
            const id = d[this.idColumn];

            if (!acc[id]) {
                acc[id] = d;
            } else {
                const obj = {};

                // typical NOSQL concatenation
                for (let key in acc[id]) {
                    if(Array.isArray(acc[id][key])) {
                        obj[key] = [...acc[id][key], ...d[key]];
                    } else {
                        obj[key] = d[key];
                    }
                }
                acc[id] = obj;
            }

            return acc;

        }, this.indexData);
    }

    _store(data) {
        this._indexData(data);
    }

    _formulateData(data) {
        return [].concat(data);
    }

    findOne(id) {
        return this.indexData[id] || null;
    }

    findAll(limit) {
        let dataSet = {};
        let currentIndex = 0;

        limit = limit || Object.keys(this.indexData).length;

        for (let data in this.indexData) {
            dataSet[data] = this.indexData[data];

            if (++currentIndex >= limit) {
                break;
            }
        }

        return dataSet;
    }

    insert(data) {
        data = this._formulateData(data);
        this._store(data);
    }
}

const DB = {
    Readings: 'Readings',
    PricePlans: 'PricePlans'
}

class DBInstanceFactory {
    constructor() {
        this.instances = {};
    }

    getDB(db) {
        switch(db) {
            case DB.Readings:
                if (!this.instances[DB.Readings]) {
                    this.instances[DB.Readings] = new DBInstance([], 'smartMeterId');
                }

                return this.instances[DB.Readings];

            case DB.PricePlans:
                if (!this.instances[DB.PricePlans]) {
                    this.instances[DB.PricePlans] = new DBInstance([], 'pricePlanId');
                }

                return this.instances[DB.PricePlans];

            default:
                throw new TypeError("DB NOT FOUND!");
        }
    }
}

module.exports = {
    dbFactory: new DBInstanceFactory(),
    DB,
    DBInstance
};