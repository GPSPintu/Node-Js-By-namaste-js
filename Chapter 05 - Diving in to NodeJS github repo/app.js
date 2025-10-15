// Import functions from the index file inside 'calculate' folder
const { calculateMultiply, calculateSum } = require("./calulate/index");

// Import data from a JSON file
const data = require("./data.json");

// Variables
var a = 10;
var b = 20;

// Output values and call functions
console.log(a);
calculateSum(a, b);
calculateMultiply(a, b);

console.log(data.name);
console.log(data.city);

// If you want to access `x` from sum.js, you need to export it in index.js too
// console.log(x); // ❌ This will throw error unless x is exported and re-exported properly


