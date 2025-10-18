// Problem Statement:
// Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1)extra memory.

// Examples:
// Example 1:
// Input:s = [“h”,”e”,”l”,”l”,”o”]

// Output:[“o”,”l”,”l”,”e”,”h”]

// Example 2:
// Input:s = [“H”,”a”,”n”,”n”,”a”,”h”]

// Output:[“h”,”a”,”n”,”n”,”a”,”H”]

// Approach: Two Pointer Technique
// Initialize two pointers, one at the start and one at the end of the array.
// Swap the characters at both pointers.
// Move the pointers towards the center until they meet.
// Time Complexity:
// Time Complexity = O(n)

// Space Complexity:
// Space Complexity = O(1)


var reverseString = function(s) {
    let len = s.length;
    let halfLen = Math.floor(len / 2);

    for (let i = 0; i < halfLen; i++) {
        let temp = s[i];
        s[i] = s[len - i - 1];
        s[len - i - 1] = temp;
    }
};
// Example Usage:
let s = ["h", "e", "l", "l", "o"];
reverseString(s);
console.log(s); // Output: ["o", "l", "l", "e", "h"]    




