var express = require('express');
var router = express.Router();

const Commune = require('../schemas/communes');

router.get('/getAll', (req, res, next) => {
    Commune.count() // const Commune =require('./models/communes');
        .then(Commune => res.status(200).json(Commune))
        .catch(error => res.status(400).json({error}));
});

router.get('/Bourges', (req, res, next) => {
    Commune.find({Nom_commune: 'BOURGES'}) // const Commune =require('./models/communes');
        .then(Commune => res.status(200).json(Commune))
        .catch(error => res.status(400).json({error}));
});

router.get('/search/:nom', (req, res, next) => {
    const filtre = req.params.nom;
    Commune.find({Nom_commune: {$regex: filtre, $options: 'i'}})
        .then(Commune => res.status(200).json(Commune))
        .catch(error => res.status(400).json({error}));
});

router.get('/postalCode/:dep', (req, res, next) => {
    const dep = parseInt(req.params.dep);
    const depMin = dep * 1000;
    const depMax = depMin + 999;
    Commune.find({Code_postal: {"$gte": depMin, "$lte": depMax}})
        .then(Commune => res.status(200).json(Commune))
        .catch(error => res.status(400).json({error}));
});

router.get('/postalCodeExact/:dep', (req, res, next) => {
    const dep = parseInt(req.params.dep);
    Commune.find({Code_postal: dep})
        .then(Commune => res.status(200).json(Commune))
        .catch(error => res.status(400).json({error}));
});

// La commune la plus au sud est la commune dont la lattitude est la plus petite
router.get('/getSouth/:dep', (req, res, next) => {
    const dep = parseInt(req.params.dep);
    const depMin = dep * 1000;
    const depMax = depMin + 999;
    Commune.find({Code_postal: {"$gte": depMin, "$lte": depMax}}).sort({lattitude: 1}).limit(1)
        .then(Commune => res.status(200).json(Commune))
        .catch(error => res.status(400).json({error}));
});

router.put('/update', (req, res, next) => {
    const filter = { Code_commune_INSEE: +req.body.Code_commune_INSEE};
    const update = { Nom_commune: req.body.Nom_commune };
    debugger;
    console.log(filter, update);
    Commune.findOneAndUpdate(filter, update)
        .then(Commune => res.status(202).json(Commune))
        .catch(error => res.status(400).json({ error }));
});

router.post('/create', (req, res, next) => {
    delete req.body._id;
    const CommuneCreate = new Commune({
        Code_commune_INSEE : req.body.Code_commune_INSEE,
        Nom_commune: req.body.Nom_commune,
        Code_postal : req.body.Code_postal,
        lattitude : req.body.lattitude,
        longitude : req.body.longitude
    });
    CommuneCreate.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});



module.exports = router;
