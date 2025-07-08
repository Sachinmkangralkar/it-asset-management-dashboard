require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Import all the new models
const MasterAsset = require('./models/MasterAsset');
const InStockAsset = require('./models/InStockAsset');
const InUseAsset = require('./models/InUseAsset');
const DamagedAsset = require('./models/DamagedAsset');
const EWasteAsset = require('./models/EWasteAsset');
const HeadsetAsset = require('./models/HeadsetAsset');

const importData = async () => {
    try {
        await connectDB();
        console.log('MongoDB connected...');

        const readCsv = (filePath) => new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });

        const dataFolderPath = path.join(__dirname, 'data');

        // Define files and their corresponding Model and collection name
        const filesToImport = [
            { model: MasterAsset, fileName: 'IT-d 1.xlsx - Master.csv', name: 'master_assets' },
            { model: InStockAsset, fileName: 'IT-d 1.xlsx - In Stock.csv', name: 'instock_assets' },
            { model: InUseAsset, fileName: 'IT-d 1.xlsx - In Use.csv', name: 'inuse_assets' },
            { model: DamagedAsset, fileName: 'IT-d 1.xlsx - Damaged products.csv', name: 'damaged_assets' },
            { model: EWasteAsset, fileName: 'IT-d 1.xlsx - E-waste laptops.csv', name: 'ewaste_assets' },
            { model: HeadsetAsset, fileName: 'IT-d 1.xlsx - Headsets.csv', name: 'headset_assets' }
        ];

        for (const fileInfo of filesToImport) {
            const filePath = path.join(dataFolderPath, fileInfo.fileName);
            if (fs.existsSync(filePath)) {
                await fileInfo.model.deleteMany({});
                const data = await readCsv(filePath);
                if (data.length > 0) {
                    await fileInfo.model.insertMany(data);
                    console.log(`Successfully imported ${data.length} documents into '${fileInfo.name}' collection.`);
                }
            } else {
                console.warn(`Warning: ${fileInfo.fileName} not found. Skipping.`);
            }
        }

    } catch (error) {
        console.error('Error during data import:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Database connection closed.');
    }
};

importData();
