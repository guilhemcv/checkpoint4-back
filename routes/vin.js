const vinRouter = require('express').Router();
const wine = require('../models/vin');
const vinExistence = require('../middleware/vin');
const connection = require('../db-config');
const db = connection.promise();

vinRouter.get('/', (req, res) => {
  wine
    .getWine()
    .then((results) => res.status(200).send(results[0]))
    .catch((err) => res.status(500).send(err));
});

vinRouter.get('/ajout', (req, res) => {
  wine
    .getWineModify()
    .then((results) => res.status(200).send(results[0]))
    .catch((err) => res.status(500).send(err));
});

vinRouter.get('/:id', (req, res) => {
  wine
    .getWineById(req.params.id)
    .then((result) => res.status(200).send(result[0][0]))
    .catch((err) => res.status(500).send(err));
});

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
