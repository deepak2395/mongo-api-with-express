const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const xmlSchema = new Schema({
    XmlContent: String,
});
module.exports = mongoose.model('xml', xmlSchema);