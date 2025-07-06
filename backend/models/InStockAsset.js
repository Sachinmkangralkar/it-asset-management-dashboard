/* File: backend/models/InStockAsset.js */
const mongoose = require('mongoose');
const InStockAssetSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('InStockAsset', InStockAssetSchema, 'instock_assets');