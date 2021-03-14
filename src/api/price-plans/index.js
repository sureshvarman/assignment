const express = require('express');
const router = express.Router();

module.exports = function(recommendationService) {

    router.get("/recommend/:smartMeterId", (req, res) => {
        res.send(recommendationService.recommend(req.params.smartMeterId, req.query.limit));
    });
    
    router.get("/compare-all/:smartMeterId", (req, res) => {
        let result = {
            smartMeterId: req.params.smartMeterId,
            pricePlanComparisons: recommendationService.comparePricePlans(req.params.smartMeterId)
        }
        res.send(result);
    });

    return router;
}