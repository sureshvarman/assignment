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

    it('Recommendation Positive', async () => {
        const res = await agent.get('/price-plans/recommend/smart-meter-0');
        expect(res.status).toEqual(200);
    });
    
    it('Recommendation Negative', async () => {
        const res = await agent.get('/price-plans/recommend/smart-meter-09');
        expect(res.status).toEqual(404);
    });

    it('Comparison Positive', async () => {
        const res = await agent.get('/price-plans/compare-all/smart-meter-0');
        expect(res.status).toEqual(200);
    });

    it('Comparison Negative', async () => {
        const res = await agent.get('/price-plans/compare-all/smart-meter-09');
        expect(res.status).toEqual(404);
    });
});