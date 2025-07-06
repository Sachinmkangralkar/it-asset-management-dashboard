/* File: backend/models/DamagedAsset.js */
const mongoose = require('mongoose');
const DamagedAssetSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('DamagedAsset', DamagedAssetSchema, 'damaged_assets');
