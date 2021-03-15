const request = require("supertest");

const server = require("../../../app");

let agent;

describe("Price Plan", () => {
    beforeAll(async () => {
        agent = await request.agent(server);
    });
    
    afterAll(async (done) => {
        return  server && server.close(done);
    });

    it('Read Positive', async () => {
        const res = await agent.get('/readings/read/smart-meter-0');
        expect(res.status).toEqual(200);
    });
    
    it('Read Negative', async () => {
        const res = await agent.get('/readings/read/smart-meter-09');
        expect(res.status).toEqual(404);
    });

    it('Store', async () => {
        const res = await agent.post('/readings/store').send({
            "smartMeterId": "smart-meter-0",
            "electricityReadings": [
                {"time":1605081676,"reading":9.0503},
                {"time":1605168078,"reading":9.0213}
            ]
        });
        expect(res.status).toEqual(200);
    });
});