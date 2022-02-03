const connection = require('../db-config');
const db = connection.promise();

/**
 * Requete pour GET tous les vins
 */
const getWine = () => {
  return db
    .query(
      'SELECT vin.id, nom, nb_bouteilles, annee, degre, description, image, prix, couleur_vin, nom_region FROM vin INNER JOIN type_vin ON vin.id_type_vin = type_vin.id INNER JOIN region ON vin.id_region = region.id'
    )
    .then((result) => result);
};

/**
 *  Requete pour GET page modification
 * 
 */
const getWineModify = () => {
  return db
    .query(
      'SELECT * FROM vin'
    )
    .then((result) => result);
};

/**
 * Requete pour calculer nombre de bouteilles 
 */
const calculBouteilles = () => {
  return db
  .query(
    'SELECT SUM(nb_bouteilles) as somme_bouteille FROM vin'
  )
  .then((result) => result);
};

/**
 * 
 * Requete pour calculer le montant total de la cave
 */
const calculPrix = () => {
  return db
  .query(
    'SELECT SUM(nb_bouteilles * prix) as somme_prix FROM vin'
  )
  .then((result) => result);
};

/**
 * Requete pour GET par id
 */
const getWineById = (id) => {
  return db
    .query('SELECT * FROM vin WHERE id = ?', [id])
    .then((result) => result);
};

/**
 * Requete pour POST vin
 */
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

module.exports = { getWine, getWineById, postWine, getWineModify, calculBouteilles, calculPrix };
