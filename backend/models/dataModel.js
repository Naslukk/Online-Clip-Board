const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    numericCode: { type: String, unique: true },
    userData: String,
    expiration: { type: Date, default: Date.now, expires: 60 }
});

dataSchema.index({ expiration: 1 }, { expireAfterSeconds: 300 });
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;