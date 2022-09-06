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


const firstValue = [];
const operator = [];
const secondValue = [];

const displayDigit = function(e) {
    const digit = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (digit.match(/[^0-9]/)) {
        return chooseOperator();
    };

    const display = document.querySelector('.display');
    if (display.textContent.length < 15) {
        display.textContent += digit;
        firstValue.push(digit);
        console.log(firstValue);
    }
}

const chooseOperator = function() {
    console.log('hi');
}

const eventListeners = function() {
    const digits = document.querySelector(".keyboard");
    digits.addEventListener('click', displayDigit);
    // window.addEventListener('keydown', displayDigit);
}

eventListeners()
