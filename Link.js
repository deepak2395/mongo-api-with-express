const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LinkSchema = new Schema({
    title: String,
    xml: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'xml'
    },
    html: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'html'
    },
    metadata: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'metadata'
    },
    endnote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'endnote'
    },
}, { timestamps: true });
module.exports = mongoose.model('Link', LinkSchema);