const express = require('express');
const router = express.Router();

module.exports = function(pricePlanService) {

    router.get("/recommend/:smartMeterId/:limit?", (req, res) => {
        res.send(pricePlanService.recommend(req.params.limit));
    });
    
    router.get("/compare-all/:smartMeterId", (req, res) => {
        let result = {
            smartMeterId: req.params.smartMeterId,
            pricePlanComparisons: pricePlanService.comparePricePlans()
        }
        res.send(result);
    });

    return router;
}