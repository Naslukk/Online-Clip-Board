const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    submitData,
    retrieveData,
    deleteData,
} = require('../controllers/dataController');

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.post('/submit', submitData);
router.get('/retrieve/:numericCode', retrieveData);
router.delete('/delete/:numericCode', deleteData);

module.exports = router;
