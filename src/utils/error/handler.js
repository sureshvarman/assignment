const {DataBaseEntryNotFound} = require("./types");

class ExpressErrorHandler {
    constructor() {
        console.log("Initialized error handler")
    }

    catch(error, req, res, next) {
        switch(error.constructor) {
            case DataBaseEntryNotFound:
                res.status(404).send({message: "Requested record/resource not found"});
                break;
            
            default:
                res.status(500).send({
                    message: "Something strange happened!, Please bear with us.."
                });
        }
    }
}

module.exports = ExpressErrorHandler;