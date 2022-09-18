const digits = document.querySelector(".keyboard");
const displayWindow = document.querySelector('.display');
const answerWindow = document.querySelector('.answer');
let firstValue = [];
let operator = [];
let secondValue = [];

// Basic math logic goes here
const add = function(num1, num2) {
    let total = num1 + num2;
    total = Math.round(total*100)/100;
    return total;
}

const multiply = function(num1, num2) {
    let total = num1 * num2;
    total = Math.round(total*100)/100;
    return total;
}

const subtract = function(num1, num2) {
    let total = num1 - num2;
    total = Math.round(total*100)/100;
    return total;
}

const divide = function(num1, num2) {
    if (num2 === 0) return 'Naaah, leave it';
    let total = num1 / num2;
    total = Math.round(total*100)/100;
    return total;
}

const pow = function(num1) {
    total = num1**2;
    return Math.round(total*100)/100;
}

const clearEntry = function() {
    !operator.length ? digits.addEventListener('click', chooseFirstValue) : false;
}

const deleteDigit = function() {
    if (displayWindow.textContent.match(/(?<=[×−÷+])$/)) return;
    operator.length ? secondValue.pop() : firstValue.pop();
    displayWindow.textContent = displayWindow.textContent.slice(0, -1);
}

const sqrt = function(num1) {
    if (num1 < 0) return 'Go study some math, bro';
    total = Math.sqrt(num1);
    return total = Math.round(total*100)/100;
}

const inverse = function(num1) {
    if (num1 === 0) return 'Just stop';
    total = 1/num1;
    total = Math.round(total*10000)/10000;
    return total;
}

const clearAll = function() {
    firstValue = [];
    operator = [];
    secondValue = [];
    answerWindow.textContent = '';
    displayWindow.textContent = 0;
    digits.addEventListener('click', chooseFirstValue);
    digits.addEventListener('click', chooseOperator);
    digits.addEventListener('click', chooseSecondValue);
}

const addDecimal = function () {
    if (displayWindow.textContent.match(/^\W/)) return;
    if (!operator.length && displayWindow.textContent.match(/(?<=[0-9]),/)) return;
    if (operator.length && displayWindow.textContent.match(/[0-9],/)) return;
    answerWindow.textContent.length > 0 ? secondValue.push('.') : firstValue.push('.');
    console.log(secondValue);
    displayWindow.textContent += ',';
}

const changeSign = function () {
    console.log('I was too lazy to create this function :-(');
}

const isNewEvaluation = function(operationSign) {
    if (answerWindow.textContent.length > 0 && operationSign.match(/[0-9]/) && displayWindow.textContent.length === 0) {
        console.log(operationSign);
        digits.addEventListener('click', chooseFirstValue);
        answerWindow.textContent = '';
        displayWindow.textContent += operationSign;
        firstValue = [];
        firstValue.push(operationSign);
        secondValue = [];
    } 
}

const differentDisplayingOfAnswer = function(total, operationSign) {
    if (operationSign.match(/[×−÷+]/)){
        answerWindow.textContent = `${total}${operationSign}`;
        displayWindow.textContent = '';
        operator.push(operationSign);
        digits.addEventListener('click', chooseSecondValue);
    } else {
        answerWindow.textContent = total;
        displayWindow.textContent = '';
    };
    if (displayWindow.textContent.match('.')) displayWindow.textContent = displayWindow.textContent.replace('.', ',');
    if (answerWindow.textContent.match('.')) answerWindow.textContent = answerWindow.textContent.replace('.', ',');
}

const differentDisplayingOfOneNumberOperationAnswer = function(total, currentNumber, num2) {
    if (currentNumber === num2) {
        secondValue = total.toString().split('');
        const regex = new RegExp(`${num2}$`);
        console.log(secondValue, regex);
        displayWindow.textContent = displayWindow.textContent.replace(regex, total);
    } else {
        firstValue = total.toString().split('');
        answerWindow.textContent = total;
        displayWindow.textContent = '';
    }
    if (displayWindow.textContent.match('.')) displayWindow.textContent = displayWindow.textContent.replace('.', ',');
}

const operate = function(e) {
    if (e.target === e.currentTarget) return;
    let num1 = Number(firstValue.join(''));
    const num2 = Number(secondValue.join(''));
    const operationSign = e.target.textContent.trim();
    isNewEvaluation(operationSign);
    if (!operationSign.match(/[(CE)C%,⌫(x²)(x⁻¹)🐸√×−÷+=]/)) return;
    if (operationSign.match(/[(CE)C%,⌫(x²)(x⁻¹)√🐸]/)) return oneNumberOperation(operationSign, num1, num2);
    let total = 0;
    let currentOperator = operator.toString();
    if (secondValue.length) {
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
        secondValue = [];
        operator = [];
        differentDisplayingOfAnswer(total, operationSign);
    }
}

const chooseFirstValue = function(e) {
    const digit = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (digit.match(/[^0-9]/)) return;
    if (!displayWindow.textContent.match(/[1-9]|[,]/)) {
        console.log('hi', displayWindow.textContent);
        displayWindow.textContent = displayWindow.textContent.replace(displayWindow.textContent, '');
    }
    if (firstValue.length < 9) {
        firstValue.push(digit);
        displayWindow.textContent += digit;
    }   
}

const chooseOperator = function(e) {
    const chosenOperator = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (chosenOperator.match(/[(CE)C%,⌫(x²)(x⁻¹)√🐸=]/)) return;
    if (chosenOperator.match(/[0-9]/)) return;
    operator.push(chosenOperator);
    if (operator.length > 1) {
        displayWindow.textContent = displayWindow.textContent.replace(operator[0], operator[1]);
        answerWindow.textContent = answerWindow.textContent.replace(operator[0], operator[1]);
        operator[0] = operator[1];
        operator.pop();
    } else {
        answerWindow.textContent.match(/[1-9]/) ? answerWindow.textContent += chosenOperator : displayWindow.textContent += chosenOperator;
    };
    digits.removeEventListener('click', chooseFirstValue);
}

const chooseSecondValue = function(e) {
    const digit = e.target.textContent.trim();
    if (e.target === e.currentTarget) return;
    if (digit.match(/[^0-9]/)) return;
    if (secondValue.length > 8) return;
    if (operator.length) {
        if (answerWindow.textContent.length < 1) {
            answerWindow.textContent =  displayWindow.textContent;
            displayWindow.textContent = '';
        }
        digit.match(/[0-9]/) ? secondValue.push(digit) && digits.removeEventListener('click', chooseOperator) : false;
        if (displayWindow.textContent.match(/^0/) && !displayWindow.textContent.match(/[0-9],/)) {
            displayWindow.textContent = displayWindow.textContent.replace('0', '');
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
        case 'C':
            return clearAll();
        case '⌫':
            return deleteDigit();
        case ',':
            return addDecimal();
        case '🐸':
            console.log('hi');
            return changeSign();       
        case '%':
            total = currentNumber/100;
            break;        
        case 'x⁻¹':
            total = inverse(currentNumber);
            break;
        case '√':
            total = sqrt(currentNumber);
            break;
        }
    differentDisplayingOfOneNumberOperationAnswer(total, currentNumber, num2);
}

const eventListeners = function() {
    digits.addEventListener('click', chooseFirstValue);
    digits.addEventListener('click', chooseSecondValue);
    digits.addEventListener('click', chooseOperator);
    digits.addEventListener('click', operate);
    // window.addEventListener('keydown', displayDigit);
}

eventListeners()
