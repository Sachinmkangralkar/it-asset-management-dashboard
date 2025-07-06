/* File: backend/routes/assets.js (NEW & CONSOLIDATED) */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import all models
const MasterAsset = require('../models/MasterAsset');
const InStockAsset = require('../models/InStockAsset');
const InUseAsset = require('../models/InUseAsset');
const DamagedAsset = require('../models/DamagedAsset');
const EWasteAsset = require('../models/EWasteAsset');
const HeadsetAsset = require('../models/HeadsetAsset');

// A helper function to get the correct model based on the URL parameter
const getModel = (collectionName) => {
    switch (collectionName) {
        case 'master': return MasterAsset;
        case 'instock': return InStockAsset;
        case 'inuse': return InUseAsset;
        case 'damaged': return DamagedAsset;
        case 'ewaste': return EWasteAsset;
        case 'headsets': return HeadsetAsset;
        default: return null;
    }
};

// Generic GET route: /api/assets/:collectionName
router.get('/:collectionName', auth, async (req, res) => {
    const Model = getModel(req.params.collectionName);
    if (!Model) return res.status(404).json({ msg: 'Collection not found' });
    try {
        const data = await Model.find({});
        res.json(data);
    } catch (e) {
        res.status(500).send('Server Error');
    }
});

// Generic POST route: /api/assets/:collectionName
router.post('/:collectionName', auth, async (req, res) => {
    const Model = getModel(req.params.collectionName);
    if (!Model) return res.status(404).json({ msg: 'Collection not found' });
    try {
        const newItem = new Model(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send('Server Error');
    }
});

// Generic DELETE route: /api/assets/:collectionName/:id
router.delete('/:collectionName/:id', auth, async (req, res) => {
    const Model = getModel(req.params.collectionName);
    if (!Model) return res.status(404).json({ msg: 'Collection not found' });
    try {
        await Model.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Asset removed' });
    } catch (e) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;