Full Documentation of Searches, Steps, and Decisions

This document contains my full thought process, searches, steps, debugging notes, and decisions made while completing the EaglePoint AI Technical Assessment.
It includes detailed documentation for Task 1, Task 2, and Task 3.

 
✅ Task 1 — Smart Text Analyzer
 
1. Problem Understanding

The goal is to build a function that analyzes a text and returns:

Total number of words

Average word length

All longest words (handle ties)

Word frequency

Case-insensitive, punctuation-safe output

The output must be a structured JSON object.

2. Requirements & Constraints
✔ Functional Requirements

Normalize text (lowercase + remove punctuation)

Split reliably into words

Count words

Compute average length

Find all longest words

Build frequency dictionary

✔ Code Quality

Clean variable names

Simple, readable loops

Proper comments

No unnecessary complexity

3. Thought Process

I broke the problem into smaller operations:

Normalize text
Convert to lowercase → remove punctuation with regex.

Split into words
Using regex to handle extra spaces.

Count words
words.length after filtering empty strings.

Compute average length
Sum lengths → divide → round to 2 decimals.

Find longest words
Two-step approach:

Determine max length

Collect all words matching that length (unique)

Frequency map
Count each occurrence using an object as dictionary.

JavaScript was ideal due to simple text manipulation.

4. Searches Made
Search 1:

🔍 “JavaScript remove punctuation from string regex”
Reason: I needed a clean way to remove characters like commas, periods, etc.
Resource:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

Search 2:

🔍 “JS split by multiple spaces regex”
Reason: Needed a reliable split pattern for whitespace.
Resource:
https://stackoverflow.com/questions/2817646/javascript-split-string-on-space-or-multiple-spaces

Search 3:

🔍 “Javascript round number to 2 decimals”
To correctly format the average word length.
Resource:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

Search 4:

🔍 “Find longest word in array JavaScript”
To confirm the approach for computing max length.
Resource:
https://stackoverflow.com/questions/17395764/javascript-find-longest-word-in-a-string

5. Step-by-Step Process
Step 1 — Normalize

Remove punctuation with:
/[^\w\s]/g

Step 2 — Split

words = cleaned.split(/\s+/)

Step 3 — Count Words

wordCount = words.length

Step 4 — Average Word Length

Loop through all words → accumulate lengths → average → round.

Step 5 — Longest Words

First pass finds max length, second collects matches.

Step 6 — Frequency

Increment counters using an object map.

6. Problems & Fixes

❌ Extra empty strings after split
✔ Fix: .filter(Boolean)

❌ Regex removed too many characters
✔ Fix: used /[^\w\s]/g instead of aggressive patterns

❌ Duplicate longest words
✔ Fix: Added !includes() check

7. Final Code

(check solution.js file inside Task1 folder)

8. Example Output

Documented with sample input and output in Readme file inside Task1 folder .

9. Why This Solution Is Best

O(n) complexity

Clean structure

Easy to maintain

Handles edge cases

Fully matches requirements

 
✅ Task 2 — Async Data Fetcher with Retry
 
1. Problem Understanding

Goal

Fetch data from mock API

Retry on failure

Wait 1 second between retries

Stop after max attempts

Use async/await

Simulate random success/failure

This task tests asynchronous control flow.

2. Requirements & Constraints

✔ Functional Requirements

Configurable retry count

Delay between attempts

Fake API with random failure

Throw error at end

Return data on success

✔ Code Quality

Clean retry loop

Proper error handling

No callback hell

Clear separation between mock API and retry logic

3. Thought Process

I split it into two parts:

A. Mock API

Uses Promise

Random success/failure

Adds small delay for realism

B. Retry Logic

Loop from 1 → maxRetries

Inside loop

Try mock API

If succeeds: return

If fails:

If attempts left → wait

If no attempts left → throw error

Pause implemented using:

await new Promise(resolve => setTimeout(resolve, 1000));

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

5. Step-by-Step Process

Implement mock API

Create async retry function

Add try/catch inside loop

Add delay only on failure

Throw error after final attempt

6. Problems & Fixes

❌ setTimeout didn't pause async function
✔ Fix: replaced with await new Promise(...)

❌ Retry delay triggered even on success
✔ Fix: moved sleep inside catch block

❌ Mock API was too fast
✔ Fix: added 300ms artificial delay

❌ Unclear error messages
✔ Fix: added descriptive retry failure message

7. Final Code

(check solution.js file inside Task2 folder)

8. Example Output

Documented with sample input and output in Readme file inside Task2 folder .

9. Why This Solution Is Best

Clean async/await

Clear retry logic

Realistic mock behavior

No unnecessary complexity

Follows industry retry patterns

 
✅ Task 3 — Rate Limiter
 
1. Problem Understanding

We must implement a sliding-window per-user rate limiter

5 requests per 60 seconds

Separate tracking per user

Block once limit reached

Auto reset after window

Demonstration required

This is similar to API throttling.

2. Requirements
✔ Functional

Track user request timestamps

Enforce limits

Clean expired timestamps

Return block message

✔ Code Quality

Modular

No global leakage

Predictable and maintainable

3. Thought Process

Needed a structure like:

{
  user123: [timestamp1, timestamp2, ...]
}


Process per request:

Get current time

Remove timestamps older than 60 seconds

Check if array length ≥ 5

If yes → block

If no → push new timestamp

Simple and efficient sliding-window algorithm.

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

Create user → timestamps dictionary

Clean timestamps older than window

Check count

Block or allow

Return result object

6. Problems & Fixes

❌ Timestamps not removed correctly
✔ Fix: Used consistent Date.now()

❌ Missing time-left in block message
✔ Fix: added calculation using earliest timestamp

❌ Multiple users mixing
✔ Fix: separated state storage using keyed object

7. Final Code

(check solution.js file inside Task3 folder)

8. Example Output

Documented with sample input and output in Readme file inside Task3 folder .


9. Time & Space Complexity

Time: O(n) per request
(filtering timestamps)

Space: O(U × n)
U = number of users

10. Why This Solution Is Best

Implements sliding window technique

Efficient lookups

Clean and modular

Realistic API behavior

Flexible and extendable