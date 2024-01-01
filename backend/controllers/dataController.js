const Data = require('../models/dataModel');

async function submitData(req, res) {
    try {
        if (!req.body.userData) {
            return res.status(500).json({ message: 'Enter a data' });
        }
        const { userData } = req.body;
        const numericCode = generateNumericCode();
        const data = new Data({ numericCode, userData });
        await data.save();
        res.json({ numericCode });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function retrieveData(req, res) {
    try {
        const { numericCode } = req.params;
        const data = await Data.findOne({ numericCode });

        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }

        res.json({ userData: data.userData });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteData(req, res) {
    try {
        const { numericCode } = req.params;
        await Data.deleteOne({ numericCode });
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function generateNumericCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

module.exports = { submitData, retrieveData, deleteData };
