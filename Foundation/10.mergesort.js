// Merge Sort
// Merge Sort is a popular divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves into one sorted result.
// It is an example of a stable sort that guarantees O(n log n) performance in all cases — best, worst, and average.
// Approach:
// Divide: Split the array into two halves.
// Conquer: Recursively sort each half using merge sort.
// Combine: Merge the two sorted halves into one sorted array.
// Key Concept: Merge Step
// The key step is merging two sorted arrays efficiently into one sorted array.
// This is done using a two-pointer approach, comparing elements from both arrays and adding the smaller one into a new result array.
// Time & Space Complexity:
// Time Complexity: O(n log n) Divide takes log n steps and merging takes linear time.

// Space Complexity: O(n) Additional space is needed to store the merged arrays.


var sortArray = function(nums) {
    if (nums.length <= 1) return nums;
    let mid = Math.floor(nums.length / 2);
    let left = sortArray(nums.slice(0, mid));
    let right = sortArray(nums.slice(mid));
    return merge(left, right);
};

function merge(left, right) {
    let res = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            res.push(left[i++]);
        } else {
            res.push(right[j++]);
        }
    }
    return [...res, ...left.slice(i), ...right.slice(j)];
}   
    
console.log(sortArray([5, 2, 3, 1])); // Output: [1, 2, 3, 5]
console.log(sortArray([5, 1, 1, 2, 0, 0])); // Output: [0, 0, 1, 1, 2, 5]   
