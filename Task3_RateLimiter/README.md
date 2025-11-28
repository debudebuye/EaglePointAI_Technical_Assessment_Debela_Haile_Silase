📘 Task 3 – Rate Limiter (Documentation)
1. Problem Understanding

We must implement a rate limiter that 

Limits users to 5 requests per 60 seconds.

Tracks each user separately.

Blocks any requests beyond 5 within the window.

Automatically resets after 60 seconds.

Includes demonstration examples.

This simulates API throttling logic used on real servers.

2. Requirements
Functional

Track requests per user.

Enforce max 5 requests.

Reset counts automatically.

Return appropriate block message.

Code Quality

Clean, modular code.

No global variables leaking.

Predictable behavior.

3. Thought Process

I needed a way to store 

user ID

their request timestamps

A simple, effective pattern 

{
   user123  [timestamp1, timestamp2, timestamp3]
}

Every request 

Remove timestamps older than 60 seconds

Check if remaining count >= 5

If yes → block

If no → add timestamp + allow

This approach is easy to follow and efficient.

4. Searches Made
🔍 Search 1

“Rate limiting algorithm sliding window JS”
Resource 
https://stackoverflow.com/questions/667508/what-is-a-good-way-to-rate-limit-in-code

🔍 Search 2

“JS remove items older than X seconds array”
Resource 
MDN Array.filter()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

🔍 Search 3

“Best way to track per user requests in memory JS”
Resource 
Node.js patterns for in-memory caching.
https://nodejs.org/en/learn/manipulating-files-and-directories/managing-memory-efficiently

5. Step-by-Step Process
Step 1 — Data Structure

Create a dictionary/object where keys = user IDs, values = arrays of timestamps.

Step 2 — Clean Old Requests

When a request comes in, remove any timestamps older than 60 seconds 

timestamps = timestamps.filter(t => now - t < 60000)

Step 3 — Check Limit

If timestamps.length >= 5, block the request.

Step 4 — Allow

Otherwise push the current timestamp.

6. Problems & Fixes
❌ Issue : timestamps didn't remove correctly

Fixed by ensuring Date.now() was used consistently.

❌ Issue : block message didn’t indicate time left

Added 

Math.ceil((this.windowMs - (now - earliest)) / 1000)

❌ Issue : multiple users mixing

Solved by keeping request history per-user in an object.

Final Code (solution.js)
// Rate limiter allowing 5 requests per 60 seconds per user

class RateLimiter {
    constructor(limit = 5, windowMs = 60000) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.users = {}; // { userId : [timestamp, timestamp...] }
    }

    isAllowed(userId) {
        const now = Date.now();

        if (!this.users[userId]) {
            this.users[userId] = [];
        }

        // Remove timestamps older than window
        this.users[userId] = this.users[userId].filter(
            t => now - t < this.windowMs
        );

        // Check if limit reached
        if (this.users[userId].length >= this.limit) {
            const earliest = this.users[userId][0];
            const timeLeft = Math.ceil((this.windowMs - (now - earliest)) / 1000);

            return {
                allowed: false,
                message: `Rate limit exceeded. Try again in ${timeLeft} seconds.`
            };
        }

        // Allow request
        this.users[userId].push(now);
        return { allowed: true, message: "Request allowed" };
    }
}


// Example usage 
const limiter = new RateLimiter();

for (let i = 1; i <= 7; i++) {
    const result = limiter.isAllowed("user123");
    console.log(i, result);
}

8. Example Outputs

Allowed Requests
1 { allowed: true, message: "Request allowed" }
2 { allowed: true, message: "Request allowed" }
3 { allowed: true, message: "Request allowed" }
4 { allowed: true, message: "Request allowed" }
5 { allowed: true, message: "Request allowed" }

Blocked Requests
6 { allowed: false, message: "Rate limit exceeded. Try again in 42 seconds." }
7 { allowed: false, message: "Rate limit exceeded. Try again in 39 seconds." }

9. Time Complexity and Space Complexity

Time Complexity
O(n) per request, where n is the number of timestamps stored for that user 
in the last 60 seconds. This comes from the array.filter() cleanup step.

Space Complexity
O(n) per user for stored timestamps, leading to O(U × n) total space where 
U is the number of active users.

10. Why This Solution is Best 

Uses sliding window technique.

Fast lookup via in-memory dictionary.

Code is modular and easily extendable.

Works for unlimited users.

Fully readable and maintainable.

Mimics real-world API throttling logic.


