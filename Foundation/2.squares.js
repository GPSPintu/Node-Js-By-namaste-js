// Problem Statement:
// Write a function that takes an integer and returns its square. Call this function and prints the result. Square(x) is a function that computes the square of a number. It returns the result instead of printing it.

// Example:
// Input: 3

// Process: square(3) = 3 × 3 = 9

// Output: The square is: 9

// Approach:
// Define a function that takes one integer as input.
// Compute the square of the number (multiply it by itself).
// Return the result from the function.
// Call the function and print the returned value.
// Explanation:
// ● Square(x) is a function that takes an integer as input.
// ● It calculates the square using x * x.
// ● Instead of printing the result inside the function, it returns the value.
// ● The result is printed outside by calling the function.

function square(x) {
    return x * x;
}

let result = square(3);
console.log("The square is:", result); //9
