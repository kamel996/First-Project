const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    // description: { type: String, required: true },
    // client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    timeStamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
