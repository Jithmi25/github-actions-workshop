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
// During the session, fix this line, commit, push,
// and watch the GitHub Actions workflow re-run and pass.
function subtract(a, b) {
  return a + b; // BUG: should be "return a - b;"
}

module.exports = { add, multiply, subtract };
