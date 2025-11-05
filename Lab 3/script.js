// Get references to HTML elements
const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

// Calculator state variables
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
let displayValue = '0';

function updateDisplay() {
    display.textContent = displayValue;
}

// Initial display update
updateDisplay();

buttons.addEventListener('click', (event) => {
    const element = event.target;

    // Exit if the click is not on a button
    if (!element.matches('button')) return;

    // Handle different button types
    if (element.classList.contains('operator')) {
        handleOperator(element.textContent);
        updateDisplay();
        return;
    }

    if (element.classList.contains('function')) {
        handleFunction(element.textContent);
        updateDisplay();
        return;
    }

    if (element.classList.contains('decimal')) {
        inputDecimal();
        updateDisplay();
        return;
    }
    
    inputNumber(element.textContent);
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, operator, value);
        displayValue = `${parseFloat(result.toPrecision(12))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, op, second) {
    if (op === '+') return first + second;
    if (op === '−') return first - second;
    if (op === '×') return first * second;
    if (op === '÷') return first / second;
    return second;
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function handleFunction(func) {
    switch (func) {
        case 'AC':
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
            displayValue = '0';
            break;
        case '00':
            // If we're waiting for the second value, start the new entry with '00'
            if (waitingForSecondValue) {
                displayValue = '00';
                waitingForSecondValue = false;
            } else {
                // If display is '0', replace it with '00', otherwise append '00'
                displayValue = displayValue === '0' ? '00' : displayValue + '00';
            }
            break;
        case '±':
            displayValue = (parseFloat(displayValue) * -1).toString();
            break;
        case '%':
            displayValue = (parseFloat(displayValue) / 100).toString();
            break;
    }
}
let persons = [
    {
        id:1,
        name:'kero',
        text:'eng',
        age:44
    },
    {
    id:2,
    name:'boita',
    text: 'doc',
    age: 50,
    }
]

let text = persons.filter(function(person){
    return person.age>45
}).map(function(person){
    return person.text
})
console.log(text)

