const { add, multiply } = require('./app');

console.log("Running unit tests...");

if (add(2, 3) !== 5) {
  console.error("Test Failed: add(2, 3) did not equal 5");
  process.exit(1);
}

if (multiply(4, 2) !== 8) {
  console.error("Test Failed: multiply(4, 2) did not equal 8");
  process.exit(1);
}

console.log("All unit tests passed successfully!");
