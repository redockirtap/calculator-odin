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

const DEF_VALUE = 3.14;
const digits = document.querySelector(".keyboard");
const firstValue = [];
let operator = [];
const secondValue = [];

const display = function(e) {
    if (e.target === e.currentTarget) return;
    const currentValue = e.target.textContent.trim();
    const displayWindow = document.querySelector('.display');
    displayWindow.textContent += currentValue;
}

const chooseFirstValue = function(e) {
    const digit = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (digit.match(/[^0-9]/)) return;

    if (firstValue.length < 15) firstValue.push(digit);
    console.log(firstValue);
}

const chooseOperator = function(e) {
    operator = [];
    const chosenOperator = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (chosenOperator.match(/[0-9]/)) return;
    operator.push(chosenOperator);
    digits.removeEventListener('click', chooseFirstValue);
    console.log(operator);
}

const chooseSecondValue = function(e) {
    const digit = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (digit.match(/[^0-9]/)) return;
    if (operator.length) {
        digit.match(/[0-9]/) ? secondValue.push(digit) && digits.removeEventListener('click', chooseOperator) : chooseOperator();
        console.log(secondValue);
    };
    console.log(operator.length);
}

const eventListeners = function() {
    digits.addEventListener('click', chooseFirstValue);
    digits.addEventListener('click', chooseSecondValue);
    digits.addEventListener('click', chooseOperator);
    digits.addEventListener('click', display);
    // window.addEventListener('keydown', displayDigit);
}

eventListeners()
