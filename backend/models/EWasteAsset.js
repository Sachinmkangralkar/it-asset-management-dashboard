/* File: backend/models/EWasteAsset.js */
const mongoose = require('mongoose');
const EWasteAssetSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('EWasteAsset', EWasteAssetSchema, 'ewaste_assets');