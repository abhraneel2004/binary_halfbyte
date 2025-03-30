const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
    const newsArray = req.body.news;

    // Validate that newsArray is a valid array
    if (!Array.isArray(newsArray) || newsArray.length === 0) {
        return res.status(400).json({ error: "An array of news is required" });
    }

    try {
        console.log("Received News Array:", newsArray); // Debugging log

        // Process each news item using aiService and handle failures individually
        const responses = await Promise.allSettled(newsArray.map(news => aiService(news)));

        // Format the response to return both successful and failed results
        const result = responses.map((res, index) => {
            if (res.status === "fulfilled") {
                return { news: newsArray[index], response: res.value };
            } else {
                return { news: newsArray[index], error: res.reason };
            }
        });

        res.json(result);
    } catch (error) {
        console.error("AI Service Error:", error); // Log the actual error for debugging
        res.status(500).json({ error: "Error processing news", details: error.message });
    }
};
