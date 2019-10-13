const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EndnoteSchema = new Schema({
    EndnoteContent: String,
});
module.exports = mongoose.model('Endnote', EndnoteSchema);