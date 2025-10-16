// Step 1: Log a message to indicate the start of the program
console.log("SetTimeoutZero demonstration");

// Step 2: Declare two numbers for multiplication
var a = 5;
var b = 10;

// Step 3: Schedule a message to be logged after 3 seconds (3000ms)
// This is non-blocking and is placed in the Event Queue, not executed immediately
setTimeout(() => {
    console.log("SetTimeout function after 3 seconds");
}, 3000);

// Step 4: Schedule another setTimeout with 0ms delay
// This does NOT execute instantly; it waits until the call stack is empty
// It's pushed to the Event Queue and runs after the main thread is done
setTimeout(() => {
    console.log("Call me ASAP");
}, 0); // Even though it's 0ms, it's still asynchronous — "trust issues" 😅

// Step 5: Define a synchronous function to multiply two numbers
function multiply(x, y) {
    const result = x * y;
    return result;
}

// Step 6: Call the multiply function and store the result in 'c'
const c = multiply(a, b);

// Step 7: Log the result of multiplication
console.log("Multiplication answer is : " + c);
