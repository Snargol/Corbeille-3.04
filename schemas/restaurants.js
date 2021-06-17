const mongoose = require('mongoose');
const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    note: { type: Number, required: true },
    drive_time: { type: String, required: true},
});
module.exports = mongoose.model('Restaurant', restaurantSchema);
