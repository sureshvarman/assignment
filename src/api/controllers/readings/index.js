const express = require('express');
const router = express.Router();


module.exports = function(meterService) {
    router.get("/read/:smartMeterId", (req, res) => {
        res.send(meterService.getReadings(req.params.smartMeterId));
    });
    
    router.post("/store", (req, res) => {
        meterService.recordReadings(req.body);
        res.send(meterService.getReadings(req.body.smartMeterId));
    });

    return router;
}