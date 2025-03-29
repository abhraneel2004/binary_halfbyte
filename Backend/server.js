// server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const cors= require('cors');


const app = express();
app.use(cors());
app.use(express.json());

// Get API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY; // Use process.env.YOUR_VARIABLE_NAME

if (!API_KEY) {
  console.error("GEMINI_API_KEY environment variable is not set.");
  process.exit(1); // Exit if the API key is missing
}

const client = new GoogleGenerativeAI(API_KEY);
const model= client.getGenerativeModel({model:'gemini-1.5-flash-8b'});

app.get('/ping', (req, res) => {
    res.send('Pong')
});
// ... (rest of your server code remains the same)
app.post('/api/generateText', async (req, res) => {
    try {
      console.log('here1');
      const preprocess = `
      Enhance the following news description array by expanding each news to exactly 60 words. Maintain factual accuracy, clarity, and a professional tone while adding relevant context or details to improve reader engagement. Avoid speculation, exaggeration, or unverified information. 
      The final output should be informative, concise, and captivating. 
      Enhanced News Description. Do not add placeholder texts.
      set temparature = 0.8
      
      `
      const { prompt } = req.body; // Get the prompt from the client
    //   console.log(prompt);
      // process the prompt
      const response = await model.generateContent(preprocess);
    //   console.log(response);
      console.log('here');
      res.json(response); // Send the generated text back to the client
  
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      res.status(500).json({ error }); // Send an error response
    }
  });
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });