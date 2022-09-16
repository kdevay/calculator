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
function changeSign(isSecondInput, isThirdInput) { 
    if (isSecondInput) { 
        answer.textContent = parseFloat(operation[0]) * -1;
        operation[0] = answer.textContent + '';
        return;
    } else if (isThirdInput){
        answer.textContent = '-';
        (operation[2]) = '-';
        return;
    }
    answer.textContent = parseFloat(operation[2]) * -1;
    operation[2] = answer.textContent + '';
    return;
}

// Clear
function clear(){
    answer.textContent = '0.0';
    operation = []
    resetFlags();
    return;
}

// reset flags to default values
function resetFlags(){
    decimalAdded = false;
    hasE = false;
    return;
}

// decimal
function addDecimal(isFirstInput, isSecondInput, isThirdInput){
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
    if (typeof number !== 'string') {
        number = number + '';
    }
    if (number.length > 10){
        return true;
    }
    return false;
}


// Converts to and from scientific notation for extra large and extra small numbers
function sciNotationConverter(number) {
    console.log('entered sciNotationConverter');
    console.log('number: ', number);

    // Increment existing exponent
    if (hasE) { 
        let temp = answer.textContent;
        // find index of 'E'
        let splitSpot = temp.indexOf('E');
        if (splitSpot === -1) {
            return 'ERROR';
        }
        // split string in two,  
        let a = temp.slice(0, splitSpot + 1); // include e
        let b = parseFloat(temp.slice(splitSpot + 1)); // cast as float
        return a + (b + 1);
        // 
    // Convert into scientific notation
    } else { 
        // Convert string to float
        let temp = parseFloat(number);
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
        } else {
            while (temp > 10){
                exponent++;
                temp = temp / 10;
            }
        }
        // round to 10's place
        temp = (Math.round(temp * 10)) / 10
        console.log("temp: ", temp);
        hasE = true;
        return temp + 'E' + exponent;
    }
}

//////////// CALCULATION FUNCTIONS ////////////
// Handles all user input: storage and error check
// limits operations to two numbers and one operator
function operationLimiter(input){
    // Bools for tracking input
    const isFirstInput = operation.length === 0;
    const isSecondInput = operation.length === 1;
    const isThirdInput = operation.length === 2;
    const isFourthInput = operation.length === 3;
    let isOperator = (input === '/' || input === '*' || input === '-' || input === '+')

    // Input is Decimal //
    if (input === '.') {
        if (!decimalAdded){
                addDecimal(isFirstInput, isSecondInput, isThirdInput);
                return;
        }
        // Don't allow multiple decimals in one number
        return 'ERROR'; 
    }

    // Input is Transformation //
    if (input === 'sign-change') { // sign change
        if (isFirstInput){
            answer.textContent = 'ERROR';
            return;
        }
        changeSign(isSecondInput, isThirdInput);
        return;
    } else if (input === 'clear'){ // clear
        clear();
        return;
    }

    // Input is Operator //
    if (isOperator) { 
        resetFlags();
        if (isFirstInput) { // default to zero if 1st input is operator
            operation.push(0);
        } else if(isFourthInput){ // limit to 1 operation
            let temp = calculate(operation);
            operation = []; // Clear resolved operation
            operation.push(temp); // add answer as first number in operation
        }
        operation.push(input); // add new operator
        return;
    } else if (input === '='){
        resetFlags();
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
    if (isSecondInput){
        operation[0] += input;
        if (isTooLong(operation[0])) {
            answer.textContent = sciNotationConverter(operation[0]);
            return;
        }
        answer.textContent = operation[0];
        return;
    } else if (isFourthInput){
        operation[2] += input;
        if (!isTooLong(operation[2])) {
            answer.textContent = operation[2];
            return;
        }
        answer.textContent = sciNotationConverter(operation[2]);
        return;
    }
    operation.push(input);
    if (isFirstInput){
        if (isTooLong(operation[0])) {
            answer.textContent = sciNotationConverter(operation[0]);
            return;
        }
        answer.textContent = operation[0];
        return;
    }
    if (isTooLong(operation[2])) {
        answer.textContent = sciNotationConverter(operation[0]);
        return;
    }
    answer.textContent = operation[2];
    return;
}



// calculator
function calculate(array) {
    console.log("entered calculate array");
    let num1 = parseFloat(array[0]); // Ensure numbers are floats
    let num2 = parseFloat(array[2]);
    let action = array[1];
    let ans = 0;
    
    // Identify operator & call matching function
    if (action === '+') {
        ans += add(num1, num2);
    } else if (action === '-') {
        ans += subtract(num1, num2);
    } else if (action === '/') {
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
    if (isTooLong(temp)){
        answer.textContent = sciNotationConverter(ans);
    } else {
        answer.textContent = ans;
    }
    return temp;
}

// Operation chain
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



// Enabled if '.' is input or calculation results in decimal
// Disabled if operator or '=' is input
let decimalAdded = false; 
let hasE = false;




/*
logic for converting from sci notation into regular number
    // Convert into long number
    if (hasE) { 
        // find index of 'E'
        let splitSpot = temp.indexOf('E');
        if (splitSpot === -1) {
            return 'ERROR';
        }
        // split string in two, omitting e & cast as float
        let a = parseFloat(temp.slice(0, splitSpot));
        let b = parseFloat(temp.slice(splitSpot + 1));
        // first half of string * (10 ** second half of string)
        return a * (10 ** b);

*/