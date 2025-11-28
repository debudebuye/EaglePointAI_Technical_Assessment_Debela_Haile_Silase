Task 2 – Async Data Fetcher with Retry (Documentation)
1. Problem Understanding

The goal is to create a JavaScript function that:

Fetches data from a URL (or mock API).

Retries automatically if the request fails.

Waits 1 second between retries.

Stops after reaching the maximum retry count.

Returns the data if successful, otherwise throws an error.

Must use async/await.

Must simulate API behavior using a mock function that randomly succeeds or fails.

The task is about asynchronous logic, handling failures, and writing clean, predictable retry logic.

2. Requirements & Constraints
✔ Functional Requirements

Implement retry mechanism (max retries configurable).

Add a 1-second delay between attempts.

Use async/await (not promises or callbacks).

Return response on success.

Throw error after last failed attempt.

API should be simulated using a random success/failure mock.

✔ Code Quality Expectations

Clean and readable variable names.

Proper error handling.

No duplication in retry logic.

Modular design (separate mock function + fetch logic).

3. Thought Process

Before coding, I broke the solution into two parts:

A. Mock API simulation

A fake API function should:

Randomly succeed or fail (to mimic real network behavior).

Return a Promise that resolves or rejects after a small delay.

Using Math.random() is perfect for this.

B. Retry Logic

The main function needs:

A loop that runs maxRetries times.

Each iteration tries the API call.

If success → return the data.

If failure:

If this is not the last attempt → wait 1 second.

If last attempt → throw error.

Waiting must be implemented using:

await new Promise(resolve => setTimeout(resolve, 1000));


This approach keeps the logic simple and predictable.

4. Searches Made During the Process
🔍 Search 1

“JavaScript wait inside async function”
Needed to confirm the cleanest way to pause execution.
Resource:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

🔍 Search 2

“Mock API function random success failure js”
To check common patterns for simulating unreliable API calls.
Resource:
https://stackoverflow.com/questions/3583724/how-can-i-simulate-a-mocking-server

🔍 Search 3

“How to write retry logic async await javascript”
To verify best practices with async/await loops.
Resource:
https://stackoverflow.com/questions/46973266/async-await-with-retry

🔍 Search 4

“Throw error after retries javascript”
For handling the last attempt correctly.
Resource:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw

5. Step-by-Step Solution Process
Step 1 — Create the Mock API

Use a Promise.

Add random success/failure logic.

Add a delay so it feels more realistic.

Step 2 — Write the Retry Function

Wrap logic inside a for loop.

Each loop attempt:

Try calling the mock API.

If successful → return the data immediately.

If failure:

If attempts remain → wait 1 second.

Otherwise → throw final error.

Step 3 — Implement Timeout

Use the common async sleep pattern:

await new Promise(resolve => setTimeout(resolve, 1000));

Step 4 — Return or Throw

The function must:

Return data if any attempt succeeds.

Throw error only after max retries fail.

6. Problems Faced & Fixes
❌ Problem: The retry loop didn’t pause

Initially used:

setTimeout(() => {}, 1000);


But setTimeout alone does not pause an async function.

✔ Fix: replaced with:

await new Promise(resolve => setTimeout(resolve, 1000));

❌ Problem: Retries were running too fast

I accidentally placed the wait outside the failure block.
This caused unnecessary delays even when a request succeeded.

✔ Fix: moved the wait inside the catch block and only before another attempt.

❌ Problem: Mock API resolved too quickly

I added a small delay (250–300ms) inside the mock to simulate real HTTP latency.

❌ Problem: Error message unclear

Originally threw a generic error.

✔ Fix: added descriptive error:

throw new Error("All retries failed after " + maxRetries + " attempts");

7. Final Code
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

8. Example Execution Output
Successful Case
Final Result: { message: 'Request successful' }

Failure Case After 3 Attempts
All retries failed after 3 attempts

9. Why This Solution Is the Best Approach

Uses async/await clearly → easy to read and maintain.

Retry logic is clean and minimal → no nested callbacks.

1-second delay implemented properly using async pause.

Mock API is realistic with latency + random failure.

Handles edge cases (e.g., success on last attempt).

Efficient → O(n) retries, no extra overhead.

Industry standard pattern for retryable asynchronous operations.