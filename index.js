//////////// OPERATION FUNCTIONS ////////////
// multiply 
function multiply(num1, num2){ return num1 * num2; }

// Add 
function add(num1, num2){ return num1 + num2; }

// Subtract 
function subtract(num1, num2){ return num1 - num2; }

// Divide 
function divide(num1, num2) {
    if (!num2){
        // division by zero
        return 'ERROR'; 
    }
    return num1 / num2;
}


//////////// TRANSFORM FUNCTIONS ////////////
// Changes sign of operation number & display number
function changeSign(isFirstInput, isSecondInput, isThirdInput) { 
    if (isFirstInput || isThirdInput) {
        answer.textContent = 'ERROR';
        return;
    } else if (isSecondInput) { 
        answer.textContent = parseFloat(operation[0]) * -1;
        operation[0] = answer.textContent + '';
        return;
    } // If it's fourth input
    answer.textContent = parseFloat(operation[2]) * -1;
    operation[2] = answer.textContent + '';
    return;
}

// Clear
function clear(){
    answer.textContent = '0.0';
    operation = []
    return;
}

// Decimal
function addDecimal(isFirstInput, isSecondInput, isThirdInput, isFourthInput){
    if (isFirstInput || isThirdInput) {
        operation.push('.');
    } else if (isSecondInput){
        if (operation[0].indexOf('.') === -1) { // if there isn't already a decimal
            operation[0] += '.'; 
        } else {
            answer.textContent = 'ERROR';
        }
    } else if (isFourthInput) {
        if (operation[2].indexOf('.') === -1) { // if there isn't already a decimal
            operation[2] += '.'; 
        } else {
            answer.textContent = 'ERROR';
        }
    }
    return;
}

// Returns true if answer is too long to fit display
function isTooLong(number) {
    let temp = number;
    
    // Make sure number is a float;
    if (typeof number === 'string') {
        temp = parseFloat(number);
    } 

    if (temp > 0) {// If number is positive
        if (temp > 9999999999 || temp < .000000001){
            return true;
        }
        return false
    } else if (temp > 0) { // If number is negative
        if (temp < -999999999 || temp > -.00000001){
            return true;
        }
        return false;
    }
    // If number is zero
    return false;
}

// Converts display to scientific notation and increments exponents 
function sciNotationConverter(number) {
    let temp;
    // If answer is in scientific notation
    if (answer.textContent.indexOf('E') !== -1) { 
        temp = answer.textContent;
        let splitSpot = temp.indexOf('E'); // find index of 'E'

        // Split string in two  
        let a = temp.slice(0, splitSpot + 1); // Include E in first string
        let b = parseFloat(temp.slice(splitSpot + 1)); // Cast second string (exponent) as float
        return a + (b + 1); // return string with incremented exponent
    
    // If converting into scientific notation
    } else { 
        // Convert string to float
        temp = parseFloat(number);
        let exponent = 0;

        // Very small positive number
        if (temp < 1 && temp > 0){ 
            while (temp < 1){
                exponent++;
                temp = temp * 10;
            }
        // Very small negative number
        } else if (temp < 0 && temp > -10){
            while (temp > -1){
                exponent++;
                temp *= 10;
            }
        // Very large negative number
        } else if (temp < 0 && temp < -1){
            while (temp < -10){
                exponent++;
                temp /= 10;
            }
        // Very large positive number
        } else {
            while (temp > 10){
                exponent++;
                temp = temp / 10;
            }
        }
        // Round to 10's place
        temp = (Math.round(temp * 10)) / 10
        return temp + 'E' + exponent;
    }
}



//////////// INPUT FUNCTION ////////////
// Stores user input in array & limits operations to two operands and one operator
function operationLimiter(input){
    // Booleans for tracking number and type of input
    const isFirstInput = operation.length === 0;
    const isSecondInput = operation.length === 1;
    const isThirdInput = operation.length === 2;
    const isFourthInput = operation.length === 3;
    const isOperator = (input === '/' || input === '*' || input === '-' || input === '+')

    if (input === '.') {
        addDecimal(isFirstInput, isSecondInput, isThirdInput, isFourthInput);
    } else if (input === 'sign-change') {
        changeSign(isFirstInput, isSecondInput, isThirdInput);
    } else if (input === 'clear') { 
        clear();
    } else if (isOperator) { 
        if (isFirstInput) { // default to zero if 1st input is operator
            operation.push(0);
        } else if(isFourthInput) { // limit to 1 operation
            let temp = calculate(operation);
            operation = []; // Clear operation
            operation.push(temp); // Add answer as first operand
        } else {
            operation.push(input); // Add operator
        }
    } else if (input === '=') {
        if (isFirstInput) { // Default to zero
            operation.push(0);
        } else if (isThirdInput) {
            let temp = operation[0]; // Default to first operand
            operation = [];
            operation.push(temp);
        } else if(isFourthInput) {
            let temp = calculate(operation);
            operation = [];
            operation.push(temp);
        }
    // If input is a number
    } else if (isSecondInput) { 
        operation[0] += input; // Concatenate with first operand
        if (isTooLong(operation[0])) {
            answer.textContent = sciNotationConverter(operation[0]);
        } else {
            answer.textContent = operation[0];
        }
    } else if (isFourthInput) { // Concatenate with  third operand
        operation[2] += input;
        if (!isTooLong(operation[2])) {
            answer.textContent = operation[2];
        } else {
            answer.textContent = sciNotationConverter(operation[2]);
        }
    // If inserting a new operand
    } else { 
        operation.push(input);
        // If inserting first operand
        if (isFirstInput) { 
            answer.textContent = operation[0];
        } else {
            // If inserting second operand
            answer.textContent = operation[2];
        }
    }
    return;
}


//////////// CALCULATOR FUNCTION ////////////
// Accepts operation array and performs operation
function calculate(array) {
    let num1 = parseFloat(array[0]); // Ensure numbers are floats
    let num2 = parseFloat(array[2]);
    let operator = array[1];
    let ans;
    
    // Identify operator & call matching function
    if (operator === '+') {
        ans = add(num1, num2);
    } else if (operator === '-') {
        ans = subtract(num1, num2);
    } else if (operator === '/') {
        ans = divide(num1, num2);
    } else { // operator = '*'
        ans = multiply(num1, num2);
    }

    // Ensure number fits display
    if (isTooLong(ans)){
        answer.textContent = sciNotationConverter(ans);
    } else {
        answer.textContent = ans;
    }
    return ans;
}

// Operation chain for tracking user input
let operation = [];

// Answer display
const answer = document.getElementById('answer');

// Number buttons
const zero = document.getElementById('0');
zero.addEventListener('click', function(){ operationLimiter('0')});
const one = document.getElementById('1');
one.addEventListener('click', function(){ operationLimiter('1')});
const two = document.getElementById('2');
two.addEventListener('click', function(){ operationLimiter('2')});
const three = document.getElementById('3');
three.addEventListener('click', function(){ operationLimiter('3')});
const four = document.getElementById('4');
four.addEventListener('click', function(){ operationLimiter('4')});
const five = document.getElementById('5');
five.addEventListener('click', function(){ operationLimiter('5')});
const six = document.getElementById('6');
six.addEventListener('click', function(){ operationLimiter('6')});
const seven = document.getElementById('7');
seven.addEventListener('click', function(){ operationLimiter('7')});
const eight = document.getElementById('8');
eight.addEventListener('click', function(){ operationLimiter('8')});
const nine = document.getElementById('9');
nine.addEventListener('click', function(){ operationLimiter('9')});

// Operator buttons
const dividedBy = document.getElementById('divide');
dividedBy.addEventListener('click', function(){ operationLimiter('/')});
const times = document.getElementById('multiply');
times.addEventListener('click', function(){ operationLimiter('*')});
const minus = document.getElementById('minus');
minus.addEventListener('click', function(){ operationLimiter('-')});
const plus = document.getElementById('plus');
plus.addEventListener('click', function(){ operationLimiter('+')});
const equals = document.getElementById('equals');
equals.addEventListener('click', function(){ operationLimiter('=')});

// Transform buttons
const signChange = document.getElementById('sign-change');
signChange.addEventListener('click', function(){ operationLimiter('sign-change')});
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function(){ operationLimiter('clear')});
const decimal = document.getElementById('.')
decimal.addEventListener('click', function(){ operationLimiter('.')});