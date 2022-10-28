const OK = (data, statusCode = 200) => ({
  statusCode: statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data || {}),
});

const ERROR = (data, statusCode = 500) => ({
  statusCode: statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

module.exports = {
  OK,
  ERROR,
};
