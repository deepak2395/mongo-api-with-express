const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PublisherSchema = new Schema({
    companyName: String,
    firstParty: Boolean,
    website: String
});
module.exports = mongoose.model('Publisher', PublisherSchema);