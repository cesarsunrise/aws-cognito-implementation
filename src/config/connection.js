const tokenSigned = require("../utils/proxySigner");
const db = require("./database");

module.exports = db(tokenSigned);
