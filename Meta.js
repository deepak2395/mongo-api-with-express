const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MetaSchema = new Schema({
    MetaContent: String,
});
module.exports = mongoose.model('Meta', MetaSchema);