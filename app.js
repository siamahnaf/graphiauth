const express = require("express");
const cors = require("cors");

//App
const app = express();
//Middlewares
app.use(express.json());
app.use(cors());
//Exports
module.exports = app;