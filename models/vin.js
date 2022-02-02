const connection = require('../db-config');
const db = connection.promise();

const getWine = () => {
  return db.query('SELECT * FROM vin').then((result) => result);
};

module.exports = { getWine };
