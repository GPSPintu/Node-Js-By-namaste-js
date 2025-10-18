const fs = require("fs");
const a = 100;

// Schedules a callback to run immediately after I/O events
setImmediate(() => console.log("setImmediate"));

// Reads from a file asynchronously
fs.readFile("./file.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
    } else {
        console.log(data); // ✅ Fixed: it was 'date' in parameter, but 'data' was used
    }
});

// A 0ms timeout — runs after synchronous code
setTimeout(() => console.log("set Timeout"), 0);

function printA() {
    console.log("a=" + a);
}

printA();
console.log("end of file");
