const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    Enhance the following news description array by expanding each news to exactly 60 words. Maintain factual accuracy, clarity, and a professional tone while adding relevant context or details to improve reader engagement. Avoid speculation, exaggeration, or unverified information. 
    The final output should be informative, concise, and captivating. 
    Enhanced News Description. Do not add placeholder texts.
    set temparature = 0.8
    `
});

async function generateContent(prompt) {
    const result = await model.generateContent(prompt)

    return result.response.text()
}

module.exports = generateContent