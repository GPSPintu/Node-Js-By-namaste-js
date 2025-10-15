// Problem Statement:
// Write a function that returns the number of negative numbers in an array.

// Approach:
// Initialize a counter to 0.
// Loop through the array.
// If the element is less than 0, increment the counter.
// Return the final count after the loop ends.
// Example:
// Input: arr = [2, -6, 4, 8, 1, -9]

// Output: 2

// Time & Space Complexity:
// Time Complexity: O(n) — where n is the number of elements in the array.

// Space Complexity: O(1) — Only a counter variable is used.

function countNegatives(arr) {
    let count = 0;
    for (let i = 0; i < arr.length ; i++) {
        if (arr[i] <0 ) {
            count++ ;

        }
    }
    return count;
}

let arr = [2, -6, 4, 8, 1, -9];;
let result = countNegatives(arr);;

console.log(result); // Output: 2
