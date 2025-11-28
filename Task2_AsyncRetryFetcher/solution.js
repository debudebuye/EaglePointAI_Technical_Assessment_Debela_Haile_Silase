// Mock API that randomly succeeds or fails
function mockApiCall() {
    return new Promise((resolve, reject) => {
        const success = Math.random() > 0.5; // 50% chance
        setTimeout(() => {
            if (success) {
                resolve({ message: "Request successful" });
            } else {
                reject("Request failed");
            }
        }, 300);
    });
}


// Main retry logic
async function fetchWithRetry(maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const data = await mockApiCall();
            return data; // success → return
        } catch (error) {
            // If final attempt → throw error
            if (attempt === maxRetries) {
                throw new Error("All retries failed after " + maxRetries + " attempts");
            }

            // Wait 1 second before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}


// Example run:
(async () => {
    try {
        const result = await fetchWithRetry(3);
        console.log("Final Result:", result);
    } catch (err) {
        console.error(err.message);
    }
})();
