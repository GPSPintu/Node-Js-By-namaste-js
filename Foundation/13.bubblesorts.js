// Bubble Sort
// Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
// This process is repeated until the array is sorted.
// After each pass, the largest unsorted element “bubbles up” to its correct position at the end of the array. It’s called “Bubble Sort”
// As smaller elements slowly “bubble” to the top of the list.
// Approach:
// Iterate through the array multiple times.
// In each pass, compare adjacent elements.
// If the current element is greater than the next one, swap them.
// After each pass, the largest unsorted element bubbles up to its correct position at the end.
// Use a boolean flag (isSwapped) to track whether any swapping happened.
// If no swaps occurred in a full pass, the array is already sorted → early exit (optimization).
// Repeat this process for n - 1 passes (where n is the array length), or until no swaps are needed.
// Time & Space Complexity:
// Time Complexity: O(n) (Best Case) when array is already sorted (optimized with isSwapped).

// Worst Case: O(n2) When array is in reverse order.

// Space Complexity: O(1) In-place sorting, no extra space used.


 let arr = [4, 5, 1, 3, 9];

function bubbleSort(arr) {
  let n = arr.length;

  // Outer loop to traverse the array multiple times
  for (let i = 0; i < n - 1; i++) {
    // Flag to check if any swapping happens in the current pass
    let isSwapped = false;

    // Inner loop for pairwise comparison
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if elements are in the wrong order
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // Set the flag to true since a swap occurred
        isSwapped = true;
      }
    }

    // If no elements were swapped in the inner loop, array is sorted
    if (!isSwapped) {
      break;
    }
  }

  // Return the sorted array
  return arr;
}

// Call the function and store the result
let result = bubbleSort(arr);

// Print the sorted array
console.log("Sorted array", result);

// Output: Sorted array [1, 3, 4, 5, 9]