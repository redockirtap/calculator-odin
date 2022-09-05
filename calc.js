// Basic math logic goes here
const add = function(num1, num2) {
    let total = num1 + num2;
    return total;
}

const multiply = function(num1, num2) {
    let total = num1 * num2;
    return total;
}

const subtract = function(num1, num2) {
    let total = num1 - num2;
    return total;
}
const divide = function(num1, num2) {
    let total = num1 / num2;
    if (total === Infinity) return 'Naaah, leave it.';
    return total;
}

const operate = function(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '/':
            return divide(num1, num2);
    }
    return total;
}

const displayDigit = function(e) {
    // console.log(e);
    // e.stopPropagation();
    // console.log(e);
    const digit = e.target.textContent;
    digit.trim();
    if (e.target === e.currentTarget) return;
    const display = document.querySelector('.display');
    display.textContent = digit;
}

const eventListeners = function() {
    const digits = document.querySelector(".keyboard");
    digits.addEventListener('click', displayDigit);
}

eventListeners()
