
var express = require('express');
var router = express.Router();

const Restaurant = require('../schemas/restaurants');


router.get('/', (req, res, next) => {
    Restaurant.find(x => x)
        .then(Restaurant => res.json(Restaurant).status(200))
        .catch(error => {
            console.log(error);
            res.status(400);
        });
    // res.json({infos: 'secure ressources', _id: req.app.get("userId")});
});

router.get('/:nom', (req, res, next) => {
    const filtre = req.params.nom;
    Restaurant.find({name: {$regex: filtre, $options: 'i'}})
        .then(Restaurant => res.status(200).json(Restaurant))
        .catch(error => res.status(400).json({error}));
});

// // get les restaurants par note
// router.get('/getSouth/:dep', (req, res, next) => {
//     const min = dep * 1000;
//     const max = depMin + 999;
//     Restaurant.find({Code_postal: {"$gte": depMin, "$lte": depMax}}).sort({lattitude: 1}).limit(1)
//         .then(Restaurant => res.status(200).json(Restaurant))
//         .catch(error => res.status(400).json({error}));
// });

// router.put('/update', (req, res, next) => {
//     const filter = { Code_commune_INSEE: +req.body.Code_commune_INSEE};
//     const update = { Nom_commune: req.body.Nom_commune };
//     debugger;
//     console.log(filter, update);
//     Restaurant.findOneAndUpdate(filter, update)
//         .then(Restaurant => res.status(202).json(Restaurant))
//         .catch(error => res.status(400).json({ error }));
// });

// router.post('/create', (req, res, next) => {
//     delete req.body._id;
//     const CommuneCreate = new Restaurant({
//         Code_commune_INSEE : req.body.Code_commune_INSEE,
//         Nom_commune: req.body.Nom_commune,
//         Code_postal : req.body.Code_postal,
//         lattitude : req.body.lattitude,
//         longitude : req.body.longitude
//     });
//     CommuneCreate.save()
//         .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//         .catch(error => res.status(400).json({ error }));
// });



module.exports = router;
