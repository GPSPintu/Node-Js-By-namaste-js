// Problem Statement:
// Write a function secondLargest(arr) that returns the second largest distinct number in an array.

// Requirements:
// The array must contain at least two elements.
// If all elements are equal, return: No second largest found.
// If the array has fewer than two elements, return: Array should have at least two numbers.
// Examples:
// Input: arr = [0, 3, 5, 2, 7, 9] → Output: 7

// Input: arr = [4, 4, 4, 4] → Output: No second largest found

// Input: arr = [5] → Output: Array should have at least two numbers

// Input: arr = [10, 20] → Output: 10

// Constraints:
// Time Complexity: O(n) — Single pass through the array.

// Space Complexity: O(1) — Constant space.

// Approach:
// Check array length. If fewer than 2 elements, return appropriate message.
// Use two variables: firstLargest and secondLargest.
// Ignore duplicates by checking num !== firstLargest before assigning secondLargest.

function secondLargest(arr) {
    if (arr.length < 2) return "Array should have at least two numbers";
    
    let first = -Infinity;
    let second = -Infinity;

    for (let num of arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num !== first) {
            second = num;
        }
    }

    return (second === -Infinity) ? "No second largest found" : second;
}

console.log(secondLargest([0, 3, 5, 2, 7, 9])); //7
