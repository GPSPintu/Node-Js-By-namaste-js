// Step 1: Import the built-in 'crypto' module for cryptographic functions
const crypto = require("node:crypto");

// (Unused) Import from 'querystring' module — can be removed if not used
// const { stringify } = require("node:querystring");

// Step 2: Log initial message to indicate program start
console.log("Program started");

// Step 3: Synchronous key derivation using pbkdf2Sync
// - Uses 5 million iterations
// - This is a blocking call that halts further code execution until complete
crypto.pbkdf2Sync("pintupandit999", "salt", 5000000, 20, "sha512");

// Step 4: This runs only after the synchronous function above completes
console.log("First synchronous key is generated");

// Step 5: Asynchronous key derivation using pbkdf2
// - Uses 50,000 iterations
// - Non-blocking: continues executing other code while this runs in the background
crypto.pbkdf2("pintupandit999", "salt", 500000, 20, "sha512", (err, key) => {
    if (err) {
        console.error("Error generating async key:", err);
        return;
    }
    console.log("Below is the asynchronous key of your password:");
    console.log(key.toString("hex")); // Optional: convert Buffer to readable string
});

// Step 6: Define a simple synchronous addition function
function addition(x, y) {
    return x + y;
}

// Step 7: Call the addition function and log the result
const c = addition(5, 10);
console.log("Addition is: " + c);
