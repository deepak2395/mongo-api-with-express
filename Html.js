const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const htmlSchema = new Schema({
    HtmlContent: String,
});
module.exports = mongoose.model('html', htmlSchema);