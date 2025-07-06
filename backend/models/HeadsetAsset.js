/* File: backend/models/HeadsetAsset.js */
const mongoose = require('mongoose');
const HeadsetAssetSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('HeadsetAsset', HeadsetAssetSchema, 'headset_assets');