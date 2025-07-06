/* File: backend/models/InUseAsset.js */
const mongoose = require('mongoose');
const InUseAssetSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('InUseAsset', InUseAssetSchema, 'inuse_assets');
