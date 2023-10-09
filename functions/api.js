const express = require('express');
const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;
const serverless = require('serverless-http')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const router = express.Router()
const app = express();
require('dotenv').config();
app.use(cors())


const port = 5000;
const projectId = 'eighth-effect-259620';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/translate', upload.single('file'), async (req, res) => {
    res.json({
        hello: "hi!"
      });

});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app)
