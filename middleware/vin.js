const connection = require('../db-config');
const db = connection.promise();

/**
 * 
 * Middleware pour savoir si un vin exite deja
 */
const checkVinExistence = (req, res, next) => {
  db.query('SELECT * FROM vin WHERE id = ?', [req.params.id])
    .then((result) => {
      if (result[0][0]) {
        req.vin = result[0][0];
        next();
      } else {
        res.status(401).send("Ce vin n'existe pas");
      }
    })
    .catch((err) => {
      res.status(401).send('erreur lors de la recherche du vin');
    });
};

module.exports = checkVinExistence;
