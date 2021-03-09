class ElectricityGenerator {
    constructor() {
        console.log('Generating Electricity Readings Data...');
    }

    generate() {
        const startTime = 1607686125; // Friday, 11 December 2020 11:28:45 GMT+00:00
        const hour = 3600;
        const readingsLength = Math.ceil(Math.random() * 20);
    
        return [...new Array(readingsLength)].map((reading, index) => ({
            time: startTime - index * hour,
            reading: Math.random() * 2,
        }));
    };
}

class PricePlansGenerator {
    constructor() {
        console.log('Generating Price Plans Data...');
    }

    generate() {
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
        
        const pricePlans = [
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

        return pricePlans;
    }
}

class MeterGenerator {
    constructor() {
        console.log('Generating Meter Data.....')
    }

    generate() {
        const meters = {
            METER0: "smart-meter-0",
            METER1: "smart-meter-1",
            METER2: "smart-meter-2",
            METER3: "smart-meter-3",
            METER4: "smart-meter-4",
        };
        
        return meters;
    }
}


module.exports = {
    ElectricityGenerator,
    PricePlansGenerator,
    MeterGenerator
}