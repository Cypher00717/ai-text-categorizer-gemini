import express from 'express';
import bodyParser from 'body-parser';
import categorizeText from './gemini.js';
import env from 'dotenv';
import cors from 'cors';

const app = express();
const Port = 3000;
env.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



// Endpoint to categorize text
app.post('/api/categorize', async (req, res) => {
    const {text} = req.body;
    if (!text) {
        return res.status(400).json({
            error : 'Text is required'
        });
    }
    const result = await categorizeText(text);

    res.json(
        result || 'Failed to categorize text' 
    );
});



// Endpoint to check server status
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});