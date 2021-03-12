const express = require('express');
const bodyParser = require('body-parser');

const seed = require("./data/seed");
const api = require('./api');

seed.run();

const app = express();
app.use(bodyParser.json());

// initialize app
app.use(api.init());

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`🚀 app listening on port ${port}`);
