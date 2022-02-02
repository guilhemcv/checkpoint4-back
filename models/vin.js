const connection = require('../db-config');
const db = connection.promise();

const getWine = () => {
  return db
    .query(
      'SELECT * FROM vin INNER JOIN type_vin ON vin.id_type_vin = type_vin.id INNER JOIN region ON vin.id_region = region.id'
    )
    .then((result) => result);
};

module.exports = { getWine };
