const vinRouter = require('express').Router();
const wine = require('../models/vin');
const vinExistence = require('../middleware/vin');
const connection = require('../db-config');
const db = connection.promise();

/**
 * Route GET tous les vins
 */

vinRouter.get('/', (req, res) => {
  wine
    .getWine()
    .then((results) => res.status(200).send(results[0]))
    .catch((err) => res.status(500).send(err));
});

/**
 * Route GET pour page ajout
 */
vinRouter.get('/ajout', (req, res) => {
  wine
    .getWineModify()
    .then((results) => res.status(200).send(results[0]))
    .catch((err) => res.status(500).send(err));
});

/**
 * Route GET pour calcul somme de bouteilles
 */
vinRouter.get('/calculbouteille', (req, res) => {
  wine
    .calculBouteilles()
    .then((results) => res.status(200).send(results[0]))
    .catch((err) => res.status(500).send(err));
});

/**
 * 
 * Route GET pour calcul montant cave
 */

vinRouter.get('/calculprix', (req, res) => {
wine
    .calculPrix()
    .then((results) => res.status(200).send(results[0]))
    .catch((err) => res.status(500).send(err));
});

/**
 * 
 * Route GET par id
 */

vinRouter.get('/:id', (req, res) => {
  wine
    .getWineById(req.params.id)
    .then((result) => res.status(200).send(result[0][0]))
    .catch((err) => res.status(500).send(err));
});

/**
 * 
 * Route POST nouveau vin
 */
vinRouter.post('/ajouter', (req, res) => {
  const {
    nom,
    nb_bouteilles,
    annee,
    degre,
    description,
    image,
    id_type_vin,
    id_region,
    prix,
  } = req.body;
  wine
    .postWine({
      nom,
      nb_bouteilles,
      annee,
      degre,
      description,
      image,
      id_type_vin,
      id_region,
      prix,
    })
    .then((result) =>
      res.status(201).send({ statut: 'nouveau vin enregistré !', ...req.body })
    )
    .catch(() => res.status(500).send('Erreur lors de la sauvegarde du vin'));
});

/**
 * 
 * Route PUT par id
 */
vinRouter.put('/:id', (req, res) => {
  let existingWine = null;
  wine.getWineById(req.params.id).then(([result]) => {
    existingWine = result[0];
    if (!existingWine) return Promise.reject('Vin non trouvé');
    return db
      .query('UPDATE vin SET ? WHERE id= ?', [req.body, req.params.id])
      .then(() => res.status(200).json({ ...existingWine, ...req.body }))
      .catch((err) => {
        console.error(err);
        if (err === 'Vin non trouvé')
          res
            .status(404)
            .send(`Le vin avec l'id ${req.params.id} n'existe pas !`);
        else res.status(500).send('erreur pour mettre a jour le vin');
      });
  });
});

/**
 * 
 * Route DELETE par id
 */

vinRouter.delete('/:id', vinExistence, (req, res) => {
  db.query('DELETE FROM vin WHERE id = ?', [req.params.id])
    .then((result) => {
      res.status(200).send('Vin supprimé');
    })
    .catch((err) => {
      res.status(401).send('Erreur lors de la recherche dans la database');
    });
});

module.exports = vinRouter;
