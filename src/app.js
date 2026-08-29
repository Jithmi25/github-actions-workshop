// Simple calculator functions used to demonstrate GitHub Actions + CI.

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// TASK FOR PARTICIPANTS:
// This function has a bug! It should subtract b from a,
// but right now it adds them instead.
function subtract(a, b) {
  return a + b; // BUG: should be "return a - b;"
}

module.exports = { add, multiply, subtract };
