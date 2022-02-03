const connection = require('../db-config');
const db = connection.promise();

const getWine = () => {
  return db
    .query(
      'SELECT vin.id, nom, nb_bouteilles, annee, degre, description, image, prix, couleur_vin, nom_region FROM vin INNER JOIN type_vin ON vin.id_type_vin = type_vin.id INNER JOIN region ON vin.id_region = region.id'
    )
    .then((result) => result);
};

const getWineModify = () => {
  return db
    .query(
      'SELECT * FROM vin'
    )
    .then((result) => result);
};

const getWineById = (id) => {
  return db
    .query('SELECT * FROM vin WHERE id = ?', [id])
    .then((result) => result);
};

const postWine = ({
  nom,
  nb_bouteilles,
  annee,
  degre,
  description,
  image,
  id_type_vin,
  id_region,
  prix
}) => {
  return db
    .query(
      'INSERT INTO vin (nom, nb_bouteilles, annee, degre, description, image, id_type_vin, id_region, prix) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nom,
        nb_bouteilles,
        annee,
        degre,
        description,
        image,
        id_type_vin,
        id_region,
        prix
      ]
    )
    .then((result) => result);
};

module.exports = { getWine, getWineById, postWine, getWineModify };
