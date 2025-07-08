const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import all the necessary models
const MasterAsset = require('../models/MasterAsset');
const InUseAsset = require('../models/InUseAsset');
const InStockAsset = require('../models/InStockAsset');
const DamagedAsset = require('../models/DamagedAsset');

// --- GET /api/stats ---
// Gathers and returns key statistics for the dashboard cards.
router.get('/', auth, async (req, res) => {
    try {
        const [totalCount, inUseCount, inStockCount, damagedCount] = await Promise.all([
            MasterAsset.countDocuments(),
            InUseAsset.countDocuments(),
            InStockAsset.countDocuments(),
            DamagedAsset.countDocuments()
        ]);
        res.json({
            totalAssets: totalCount,
            assetsDeployed: inUseCount,
            assetsInStock: inStockCount,
            assetsDamaged: damagedCount,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- GET /api/stats/group/:field --- (NEW ENDPOINT)
// Groups all assets in the master collection by a specific field for charts.
router.get('/group/:field', auth, async (req, res) => {
    try {
        const fieldToGroup = `$${req.params.field}`;

        const data = await MasterAsset.aggregate([
            {
                $group: {
                    _id: fieldToGroup, // Group by the field from the URL (e.g., '$Model')
                    count: { $sum: 1 } // Count how many items are in each group
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    name: '$_id', // Rename _id to 'name' for the chart library
                    value: '$count' // Rename count to 'value'
                }
            },
            { $sort: { value: -1 } } // Sort by the most common items
        ]);

        res.json(data);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;