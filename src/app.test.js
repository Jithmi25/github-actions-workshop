const { add, multiply, subtract } = require('./app');

console.log("Running unit tests...");

let failed = false;

function check(description, actual, expected) {
  if (actual !== expected) {
    console.error(`Test Failed: ${description} -> got ${actual}, expected ${expected}`);
    failed = true;
  } else {
    console.log(`Test Passed: ${description}`);
  }
}

check("add(2, 3) should equal 5", add(2, 3), 5);
check("multiply(4, 2) should equal 8", multiply(4, 2), 8);
check("subtract(10, 4) should equal 6", subtract(10, 4), 6);

if (failed) {
  console.error("\nSome tests failed.");
  process.exit(1);
}

console.log("\nAll unit tests passed successfully!");
