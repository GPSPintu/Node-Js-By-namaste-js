// Problem Statement:
// Write a function that returns the smallest number in an array.

// Approach:
// Initialize a variable smallest to Infinity.
// Loop through the array.
// If the current element is less than smallest, update smallest.
// Return smallest after the loop ends.
// Example:
// Input: arr = [2, -6, 4, 8, 1, -9]

// Output: -9

// Time & Space Complexity:
// Time Complexity: O(n) – where n is the number of elements in the array.

// Space Complexity: O(1) – Only a single variable is used.




function findSmallest(arr) {
    let smallest = Infinity ;
    for (let i = 0 ; i < arr.length ; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i] ;
        }       
    }
    return smallest ;
}
let arr = [2, -6, 4, 8, 1, -9];;
let result = findSmallest(arr);;        
console.log(result); // Output: -9