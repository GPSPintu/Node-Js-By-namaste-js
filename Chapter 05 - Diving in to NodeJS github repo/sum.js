// Modules protect their variables and functions from leaking
console.log("Reached at the sum module");

// Function to calculate sum
function calculateSum(a, b) {
    const sum = a + b;
    console.log(sum);
}

// Check what's being exported before setting it
console.log("Before export:", module.exports);

// Export the function
// These all are valid and do the same thing:
// module.exports.calculateSum = calculateSum;
// module.exports = { calculateSum };
module.exports = { calculateSum };

// Check what's being exported after setting it
console.log("After export:", module.exports);

