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

const pow = function(num1) {
    console.log(num1**2);
    return num1**2;
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
        case 'x²':
            console.log('hiiiii');
            total = pow(num1);
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

const oneNumberOperation = function(operationSign, num1, num2) {
    let currentNumber;
    secondValue.length ? currentNumber = num2 : currentNumber = num1;
    console.log(`I am ${operationSign} and ${currentNumber}`);
    switch(operationSign) {
        case 'x²':
            total = pow(currentNumber);
            break;
        case 'C':
            total = 0;
            break;
        case '%':
            total = currentNumber/100;
            break;
        case 'x⁻¹':
            total = 1/currentNumber;
            break;
        }
    // let counter = 0;
    const currentNumberString = currentNumber.toString();
    const totalString = total.toString();
    let displayString = currentNumberString.replace(currentNumberString, totalString);
    console.log(currentNumberString, totalString, displayString);
    // while (counter <= currentNumberString.length+1) {
    //     let newString = currentNumberString.pop();
    //     counter++;
    // }
    // console.log(newString);
    digits.addEventListener('click', chooseOperator);
    firstValue = total.toString().split('');
    console.log(total);
    displayWindow.textContent = total;
}

const eventListeners = function() {
    digits.addEventListener('click', chooseFirstValue);
    digits.addEventListener('click', chooseSecondValue);
    // digits.addEventListener('click', oneNumberOperation);
    digits.addEventListener('click', chooseOperator);
    digits.addEventListener('click', display);
    digits.addEventListener('click', operate);
    // window.addEventListener('keydown', displayDigit);
}

eventListeners()
