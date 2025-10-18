// Problem Statement:
// Given an integer array nums and an integer val, remove all occurrences of val in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.


// Consider the number of elements in nums which are not equal to val be k. To get accepted, you need to:

// Modify nums such that the first k elements contain elements not equal to val. The remaining elements beyond k do not matter. Return k.

// Examples:
// Example 1:
// Input: nums = [3,2,2,3], val = 3

// Output: 2, nums = [2,2,_,_]

// Explanation: The first 2 elements should be 2. Underscores represent irrelevant values.

// Example 2:
// Input: nums = [0,1,2,2,3,0,4,2], val = 2

// Output: 5, nums = [0,1,4,0,3,_,_,_]

// Explanation: The first 5 elements should be any order of [0,1,4,0,3].

// Approach:
// Use pointerx to track where the next non-val element should go.
// Traverse the array with index i.
// If nums[i] != val, assign nums[x] = nums[i]and increment x.
// Time Complexity:
// Time Complexity = O(n), where n = nums.length.

// Space Complexity:
// Space Complexity = O(1)(constant extra space).


var removeElement = function(nums, val) {
    let x = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != val) {
            nums[x] = nums[i];
            x++;
        }
    }
    return x;
};


// Example Usage:
let nums = [3, 2, 2, 3];
let val = 3;
let newLength = removeElement(nums, val);
console.log(newLength); // Output: 2
console.log(nums.slice(0, newLength)); // Output: [2, 2]















