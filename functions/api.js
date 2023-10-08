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

const projectId = 'eighth-effect-259620';

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, 'c.json');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/translate', upload.single('file'), async (req, res) => {
  try {
    const translationClient = new TranslationServiceClient();

    const targetLanguage = 'en'; // Defina o idioma de destino desejado

    const documentInputConfig = {
      content: req.file.buffer, // Usamos o buffer do arquivo enviado
      mimeType: 'application/pdf',
    };

    const request = {
      parent: `projects/${projectId}/locations/us-central1`,
      documentInputConfig,
      targetLanguageCode: targetLanguage,
    };

    const [response] = await translationClient.translateDocument(request);

    res.setHeader('Content-Disposition', 'attachment; filename=seu_arquivo.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    res.end(response.documentTranslation.byteStreamOutputs[0])

  } catch (err) {
    console.error('Erro ao traduzir:', err);
    res.status(500).send('Erro ao traduzir o arquivo.');
  }

});

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app)