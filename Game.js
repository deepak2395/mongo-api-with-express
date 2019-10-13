const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PublisherSchema = new Schema({
    title: String,
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher'
    }
});
module.exports = Item = mongoose.model('Game', PublisherSchema);