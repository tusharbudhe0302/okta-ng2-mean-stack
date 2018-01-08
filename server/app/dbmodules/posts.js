var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Posts', PostSchema);
