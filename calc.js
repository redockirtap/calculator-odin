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

const pow = function(num1) {
    return num1**2;
}

const clearEntry = function() {
    !operator.length ? digits.addEventListener('click', chooseFirstValue) : false;
}

const operate = function(e) {
    if (e.target === e.currentTarget) return;
    let num1 = Number(firstValue.join(''));
    const num2 = Number(secondValue.join(''));
    const operationSign = e.target.textContent.trim();
    if (!operationSign.match(/[(CE)C%,⌫(x²)(x⁻¹)√±=]/)) return;
    if (operationSign.match(/[(CE)C%,⌫(x²)(x⁻¹)√±]/)) return oneNumberOperation(operationSign, num1, num2);
    let total = 0;
    secondValue = [];
    const currentOperator = operator.toString();
    switch(currentOperator) {
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
    operator = [];
    displayWindow.textContent = total;
}

const DEF_VALUE = 3.14;
const digits = document.querySelector(".keyboard");
const displayWindow = document.querySelector('.display');
let firstValue = [];
let operator = [];
let secondValue = [];


const chooseFirstValue = function(e) {
    const digit = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (digit.match(/[^0-9]/)) return;
    if (displayWindow.textContent.match(/^0/) || displayWindow.textContent === 'Naaah, leave it.') {
        console.log('hi', displayWindow.textContent);
        displayWindow.textContent = displayWindow.textContent.replace(displayWindow.textContent, '');
    }
    if (firstValue.length < 15) firstValue.push(digit);
    displayWindow.textContent += digit;
}

const chooseOperator = function(e) {
    const chosenOperator = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (chosenOperator.match(/[(CE)C%,⌫(x²)(x⁻¹)√±]/)) return;
    if (chosenOperator.match(/[0-9]/)) return;
    operator.push(chosenOperator);
    if (operator.length > 1) {
        displayWindow.textContent = displayWindow.textContent.replace(operator[0], operator[1]);
        operator[0] = operator[1];
        operator.pop();
    } else {displayWindow.textContent += chosenOperator;};
    digits.removeEventListener('click', chooseFirstValue);
}

const chooseSecondValue = function(e) {
    const digit = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (digit.match(/[^0-9]/)) return;
    if (operator.length) {
        digit.match(/[0-9]/) ? secondValue.push(digit) && digits.removeEventListener('click', chooseOperator) : false;
        if (displayWindow.textContent.match(/(?<=[×−÷+])0/)) {
            displayWindow.textContent = displayWindow.textContent.replace(/(?<=[×−÷+])0/, '');
        }
        displayWindow.textContent += digit;
    };
}

const oneNumberOperation = function(operationSign, num1, num2) {
    let currentNumber;
    secondValue.length ? currentNumber = num2 : currentNumber = num1;
    switch(operationSign) {
        case 'x²':
            total = pow(currentNumber);
            break;
        case 'CE':
            clearEntry();
            total = 0;
            break;
        case '%':
            total = currentNumber/100;
            break;
        case 'x⁻¹':
            total = 1/currentNumber;
            break;
        }
    if (currentNumber === num2) {
        secondValue = total.toString().split('');
        const regex = new RegExp(`${num2}$`);
        console.log(secondValue, regex);
        displayWindow.textContent = displayWindow.textContent.replace(regex, total);
    } else {
        firstValue = total.toString().split('');
        displayWindow.textContent = total;
    }
}

const eventListeners = function() {
    digits.addEventListener('click', chooseFirstValue);
    digits.addEventListener('click', chooseSecondValue);
    digits.addEventListener('click', chooseOperator);
    digits.addEventListener('click', operate);
    // window.addEventListener('keydown', displayDigit);
}

eventListeners()
