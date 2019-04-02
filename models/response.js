const mongoose = require('mongoose');

const Response = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    trigger: String,
    reply: String,
});

module.exports = mongoose.model("Response", Response);