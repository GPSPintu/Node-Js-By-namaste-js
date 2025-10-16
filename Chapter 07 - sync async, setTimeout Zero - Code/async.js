// Step 1: Import 'fs' for file system and 'https' for making HTTP requests
const fs = require("fs");
const https = require("https");

// Step 2: Log initial message
console.log("Asynchronous Javascript");

// Step 3: Define two numbers to be multiplied later
var a = 5;
var b = 10;

// Step 4: Try to read 'file.txt' synchronously (blocks execution if exists)
try {
    const data = fs.readFileSync("./file.txt", "utf8");
    console.log("Sync file read: " + data);
} catch (err) {
    console.error("Sync file read error:", err.message);
}

// Step 5: This line runs after sync read completes
console.log("This will execute only after reading the file");

// Step 6: Make an async HTTPS GET request to fetch product data
https.get("https://dummyjson.com/products/1", (res) => {
    console.log("data fetch successfully");
});

// Step 7: Asynchronous timer – logs after 5 seconds
setTimeout(() => {
    console.log("Execute it after 5 seconds");
}, 5000);

// Step 8: Asynchronously read 'file.txt' (non-blocking)
fs.readFile("./file.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Async file read error:", err.message);
    } else {
        console.log("file data:" + data);
    }
});

// Step 9: Synchronous multiplication function
function multiply(x, y) {
    const result = x * y;
    return result;
}

// Step 10: Call the multiply function and log the result
const c = multiply(a, b);
console.log("Multiplication ans is:" + c);
