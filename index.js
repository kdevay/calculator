//////////// OPERATION FUNCTIONS ////////////
// multiply 
function multiply(num1, num2){ return num1 * num2; }

// add 
function add(num1, num2){ return num1 + num2; }

// subtract 
function subtract(num1, num2){ return num1 - num2; }

// divide 
function divide(num1, num2) {
    if (!num2){
        // division by zero
        return 'ERROR'; 
    }
    return num1 / num2;
}

//////////// TRANSFORM FUNCTIONS ////////////
// Changes sign of operation number & display number
function changeSign() { 
    if (isSecondInput) { // No changes applied on FirstInput
        answer = parseFloat(operation[0]) * -1;
        operation[0] = answer + '';
        return;
    } else if (isThirdInput){
        answer = '-';
        (operation[2]) = '-';
        return;
    }
    answer = parseFloat(operation[2]) * -1;
    operation[2] = answer + '';
    return;
}

// Clear
function clear(){
    answer = '0.0';
    operation = []
    reset();
    return;
}

// reset flags to default values
function resetFlags(){
    isAnsFlag = false;
    decimalAdded = false;
    return;
}

// decimal
function addDecimal(input){
    if (isFirstInput || isThirdInput) {
        operation.push('.');
    } else if (isSecondInput){
        operation[0] += '.'; 
    } else {// if isFourthInput 
        operation[2] += '.';
    }
    decimalAdded = true; 
    return;
}


function isTooLong(number) {
    if (number > 9999999999 || number < 0.00000001){
        return true;
    }
    return false;
}


// Converts to and from scientific notation for extra large and extra small numbers
function sciNotationConverter(number) {
    // Convert into long number
    if (string[3] === 'E') { 
        // find index of 'E'
        let splitSpot = number.indexOf('E');
        if (splitSpot === -1) {
            return 'ERROR';
        }
        // split string in two, omitting e & cast as float
        let a = parseFloat(number.slice(0, splitSpot));
        let b = parseFloat(number.slice(splitSpot + 1));
        // first half of string * (10 ** second half of string)
        return a * (10 ** b);
    // Convert into scientific notation
    } else { 
        let exponent = 0;
        if (number < 1){ // If very small
            while (num < 1){
                exponent++;
                num = num * 10;
            }
        } else {
            while (num > 10){
                exponent++;
                num = num / 10;
            }
        }
    isDecimalFlag = true;
    return num + 'E' + exponent;
    }
}

//////////// CALCULATION FUNCTIONS ////////////
// Handles all user input: storage and error check
// limits operations to two numbers and one operator
function operationLimiter(input){
    // Input is Decimal //
    if (input === '.') {
        if (!decimalAdded){
                addDecimal();
                return;
        }
        // Don't allow multiple decimals in one number
        return 'ERROR'; 
    }

    // Input is Transformation //
    if (input === 'sign-change') { // sign change
        changeSign();
        return;
    } else if (input === 'clear'){ // clear
        clear();
        return;
    }

    // Input is Operator //
    if (input === isOperator) { 
        resetFlags();
        if (isFirstInput) { // default to zero if 1st input is operator
            operation.push(0);
        } else if(isFourthInput){
            let temp = calculate(operation);
            operation = [];
            operation.push(temp);
        }
        operation.push(input);
        return;
    } else if (input === '='){
        if (isFirstInput) { // default to zero
            operation.push(0);
        } else if (isThirdInput) {
            let temp = operation[0];
            operation = [];
            operation.push(temp);
        } else if(isFourthInput){
            let temp = calculate(operation);
            operation = [];
            operation.push(temp);
        }
        return
    }

    // Input is Number //
    if ( input === isNumber) {
        if (isSecondInput){
            operation[0] += input;
            if (!isTooLong(operation[0])) {
                answer = operation[0];
                return;
            }
            answer = sciNotationConverter(operation[0]);
            // displayMessage()
            return;
        } else if (isFourthInput){
            operation[2] += input;
            if (!isTooLong(operation[2])) {
                answer = operation[2];
                return;
            }
            answer = sciNotationConverter(operation[2]);
            // displayMessage()
            return;
        }
        operation.push(input);
        return;
    }
}



// calculator
function calculate(array) {
    let num1 = parseFloat(array[0]); // Ensure numbers are floats
    let num2 = parseFloat(array[2]);
    let action = array[1];
    let ans = 0;
    
    // Identify operator & call matching function
    if (action = '+') {
        ans += add(num1, num2);
    } else if (action = '-') {
        ans += subtract(num1, num2);
    } else if (action = '/' {
        ans += divide(num1, num2);
    } else { // action = '*'
        ans += multiply(num1, num2);
    }

    // Flag if ans contains decimal
    let temp = ans + '';
    if (temp.indexOf('.') !== -1) {
        decimalAdded = true;
    }
    // Ensure number fits display
    if (isTooLong(ans)){
        answer = sciNotationConverter(ans);
    }
    answer = ans;
    return temp;
}

// Operation chain
let operation = [];

// Answer display
let answer = document.getElementById('answer').textContent;

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

// Transform buttons
const signChange = document.getElementById('sign-change');
signChange.addEventListener('click', function(){ operationLimiter('sign-change')});
const clear = document.getElementById('clear');
clear.addEventListener('click', function(){ operationLimiter('clear')});
const decimal = document.getElementById('.')
decimal.addEventListener('click', function(){ operationLimiter('decimal')});

// Bools
const isOperator = ('/' || '*' || '-' || '+');
const isNumber = ('0' || '1' || '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9');
const isFirstInput = operation.length === 0;
const isSecondInput = operation.length === 1;
const isThirdInput = operation.length === 2;
const isFourthInput = operation.length === 3;

// Enabled if '.' is input or calculation results in decimal
// Disabled if operator or '=' is input
let decimalAdded = false; 
