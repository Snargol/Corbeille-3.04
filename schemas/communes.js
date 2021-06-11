const mongoose = require('mongoose');
const communeSchema = mongoose.Schema({
    Code_commune_INSEE: { type: Number, required: true },
    Nom_commune: { type: String, required: true },
    Code_postal: { type: Number, required: true },
    lattitude: { type: Number, required: false},
    longitude: { type: Number, required: false },
});
module.exports = mongoose.model('Commune', communeSchema);
