/* File: backend/models/MasterAsset.js */
const mongoose = require('mongoose');
const MasterAssetSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('MasterAsset', MasterAssetSchema, 'master_assets');







