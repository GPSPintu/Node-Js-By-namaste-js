// Step 1: Log a message to the console to indicate the program has started
console.log("Synchronous Code");

// Step 2: Declare a variable 'a' and assign it a numeric value
var a = 62656954;

// Step 3: Declare another variable 'b' and assign it a numeric value
var b = 6256546;

// Step 4: Define a function named 'multiply' that takes two parameters and returns their product
function multiply(a, b) {
    const result = a * b;  // Multiply the two parameters and store in 'result'
    return result;         // Return the result to the caller
}

// Step 5: Call the 'multiply' function with variables 'a' and 'b' as arguments and store the result in variable 'c'
var c = multiply(a, b);

// Step 6: Log the result of the multiplication to the console
console.log("Multiplication of a and b is " + c);
