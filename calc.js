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
    console.log(total);
    return total;
}

const divide = function(num1, num2) {
    let total = num1 / num2;
    if (total === Infinity) return 'Naaah, leave it.';
    return total;
}

const operate = function(e) {
    if (e.target === e.currentTarget) return;
    const equalitySign = e.target.textContent.trim();
    if (!equalitySign.match('=')) return;
    let total = 0;
    let num1 = Number(firstValue.join(''));
    const num2 = Number(secondValue.join(''));
    secondValue = [];
    operator = operator.toString();
    console.log(num1, num2, operator);
    switch(operator) {
        case '+':
            total = add(num1, num2);
            break;
        case '×':
            total = multiply(num1, num2);
            break;
        case '−':
            total = subtract(num1, num2);
            break;
        case '÷':
            total = divide(num1, num2);
            break;
    }
    digits.addEventListener('click', chooseOperator);
    firstValue = total.toString().split('');
    console.log(total);
    displayWindow.textContent = total;
}

const DEF_VALUE = 3.14;
const digits = document.querySelector(".keyboard");
const displayWindow = document.querySelector('.display');
let firstValue = [];
let operator = [];
let secondValue = [];

const display = function(e) {
    if (e.target === e.currentTarget) return;
    const currentValue = e.target.textContent.trim();
    if (currentValue.match(/[(CE)C%,⌫(x²)(x⁻¹)√±]/)) return;
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
    const chosenOperator = e.target.textContent.trim();
    operator = [];
    if (e.target === e.currentTarget) return;
    if (chosenOperator.match(/[(CE)C%,⌫(x²)(x⁻¹)√±]/)) return;
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
    digits.addEventListener('click', operate);
    // window.addEventListener('keydown', displayDigit);
}

eventListeners()
