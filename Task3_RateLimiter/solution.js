// Rate limiter allowing 5 requests per 60 seconds per user

class RateLimiter {
    constructor(limit = 5, windowMs = 60000) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.users = {}; // { userId: [timestamp, timestamp...] }
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



// Example usage:
const limiter = new RateLimiter();

for (let i = 1; i <= 7; i++) {
    const result = limiter.isAllowed("user123");
    console.log(i, result);
}
