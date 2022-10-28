let AWS = require("aws-sdk");
const {
  MYSQL_USER,
  MYSQL_PROXY_HOST,
  MYSQL_REGION,
  MYSQL_PORT,
} = require("../config");

const signer = new AWS.RDS.Signer({
  region: MYSQL_REGION,
  hostname: MYSQL_PROXY_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
});

const token = signer.getAuthToken({
  username: MYSQL_USER,
});

module.exports = token;
