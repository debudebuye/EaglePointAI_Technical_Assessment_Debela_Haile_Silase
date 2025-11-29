function analyzeText(text) {

     
    // 1. Normalize the text
     
    // Convert to lowercase for case-insensitivity
    // Remove punctuation using regex: anything not a word or whitespace
    const cleaned = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "");

     
    // 2. Split text into words
     
    // Split by one or more spaces (\s+)
    // Filter(Boolean) removes empty strings caused by extra spaces
    const words = cleaned.split(/\s+/).filter(Boolean);

     
    // 3. Total word count
     
    const wordCount = words.length;

     
    // 4. Average word length
     
    // Sum all word lengths
    let totalLength = 0;
    for (const w of words) {
        totalLength += w.length;
    }

    // Avoid division by zero for empty input
    const avgLength = wordCount > 0 ? (totalLength / wordCount) : 0;

    // Round avg to 2 decimals
    const averageWordLength = Number(avgLength.toFixed(2));

     
    // 5. Identify longest word(s)
     
    // Find the maximum word length
    let maxLen = 0;
    for (const w of words) {
        if (w.length > maxLen) {
            maxLen = w.length;
        }
    }

    // Collect all unique words with this maximum length
    const longestWords = [];
    for (const w of words) {
        if (w.length === maxLen && !longestWords.includes(w)) {
            longestWords.push(w);
        }
    }

     
    // 6. Word frequency (case-insensitive)
     
    const wordFrequency = {};
    for (const w of words) {
        if (!wordFrequency[w]) wordFrequency[w] = 0;
        wordFrequency[w]++;
    }

     
    // 7. Return final analysis object
     
    return {
        word_count: wordCount,
        average_word_length: averageWordLength,
        longest_words: longestWords,
        word_frequency: wordFrequency
    };
}

// --------------------------------------
// Export the function for reuse/testing
// --------------------------------------
// This allows the analyzeText function to be imported in other files,
// enabling unit testing or integration with additional modules.
module.exports = analyzeText;


// -------------------------------
// User Input Test (Interactive)
// -------------------------------
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter text to analyze: ", function (input) {
    const result = analyzeText(input);
    console.log("\nAnalysis Result:");
    console.log(result);

    rl.close();
});