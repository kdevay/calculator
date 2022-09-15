//////////// OPERATION FUNCTIONS ////////////
// multiply 
function multiply(num1, num2){ return num1 * num2; }

// add 
function add(num1, num2){ return num1 + num2; }

// subtract 
function subtract(num1, num2){ return num1 - num2; }

// divide 
function divide(num1, num2){
    if (!num2){
        // division by zero
        return "ERROR"; 
    }
    return num1 / num2;
}

//////////// TRANSFORM FUNCTIONS ////////////
// Changes sign of existing input number
// No changes applied on FirstInput
function changeSign() { 
    if (isSecondInput || isThirdInput){
        operation[0] *= -1;
        answer = operation[0];
        return;
    }
    operation[2] *= -1;
    answer = operation[2];
    return;
}

// Clear
function clear(){
    answer = 0.0;
    operation = []
    changeSignFlag = false;
    decimalFlag = false;
    decimalTracker = 10;
    numSizeTracker = 10;
}

// combines numbers > 9
function concatNumber(input){
    if (isSecondInput){
        input += operation[0] * numSizeTracker;
        numSizeTracker *= 10
        return;
    }
    input += operation[2] * numSizeTracker;
    numSizeTracker *= 10
    return;
}

// decimal
function addDecimal(input){
    if (input === ".") {
        if (isFirstInput) {
            operation[0] = 0.00000000001;
            return;
        } else if (isSecondInput){
            operation[0] += 0.00000000001;
            return;
        } else if (isThirdInput) {
            operation[2] = .00000000001;
            return;
        }
        operation[2] += 0.00000000001;
        return;
    } else { // If input is a number
        if (isSecondInput){
            operation[0] += (input / decimalTracker);
            decimalTracker *= 10;
        } else { // if isThirdInput
            operation[2] += (input / decimalTracker)
            decimalTracker *= 10;
        }
        // Add answer to display
        if (!sizeCheck(operation[2])) {
            answer = operation[2];
        } else {
            answer = sciNotationConverter(operation[2]);
        }
        return;
    }
}

function sizeCheck(number) {
    if (number > 9999999999.9 || number < 0.0000000001){
        return true;
    }
    return false;
}

// Converts to and from scientific notation for extra large and extra small numbers
function sciNotationConverter(number){
    // Convert num to string for answer display
    if (typeof number !== "string"){ 
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
        return num + "E" + exponent;
    // Convert string to num for calculations
    } else { 
        // find index of "E"
        let splitSpot = number.indexOf('E');
        if (splitSpot === -1){
            return "ERROR";
        }
        // split string in two, omitting e & cast as float
        let a = parseFloat(number.slice(0, splitSpot));
        let b = parseFloat(number.slice(splitSpot + 1));
        // first half of string * (10 ** second half of string)
        return a * (10 ** b);
    }
}

//////////// CALCULATION FUNCTIONS ////////////
// Handles all user input: storage and error check
// limits operations to two numbers and one operator
function operationLimiter(input){
    // Decimals //
    if (input === '.') {
        if (!decimalFlag){
                addDecimal();
                decimalFlag = true;
                return;
        }
        return "ERROR";
    }

    // Operators //
    if (input === isOperator) { 
        if (decimalFlag === true) {
            decimalFlag = false;
        } else if (isFirstInput) { // default to zero if 1st input is operator
            operation.push(0);
        }
        operation.push(input);// -------------------------------------
        return;

    // Transformations //
    } else if (typeof input === "string"){
        if (input === 'sign-change') { // sign change
            changeSign();
            return;
        } else if (input === 'clear'){ // clear
            clear();
            return;
        } else { // convert to number
            input = sciNotationConverter(input);
        }

    // Numbers //
    } else if (typeof input === 'number') {
        if (decimalFlag === true){
            addDecimal(input);
            return;
        } 
        if (isSecondInput || isFourthInput){
            concatNumber(input);
            return
        }



    answer = "INTERNAL ERROR";
    return;

    // answer = input;
    // operation.push(input);
    // return;
}










// calculator
function calculate(array){
    let num1 = array[0];
    let num2 = array[2];
    let action = array[1];
    let ans = 0;
    // Ensure number is float
    console.log("num1: ",num1);
    console.log("num2: ", num2);
    console.log("action: ", action);
    return;
    // logic for finding operator
    // call appropriate helper function
    // check final number for size
    // if (ans > 9999999999.9){
    //     return sciNotationConverter(answer);
    // }
}

// Operation chain
let operation = [];

// Answer display
let answer = document.getElementById('answer').textContent;

// Number buttons
const zero = document.getElementById('0');
zero.addEventListener('click', function(){ operationLimiter(0)});
const one = document.getElementById('1');
one.addEventListener('click', function(){ operationLimiter(1)});
const two = document.getElementById('2');
two.addEventListener('click', function(){ operationLimiter(2)});
const three = document.getElementById('3');
three.addEventListener('click', function(){ operationLimiter(3)});
const four = document.getElementById('4');
four.addEventListener('click', function(){ operationLimiter(4)});
const five = document.getElementById('5');
five.addEventListener('click', function(){ operationLimiter(5)});
const six = document.getElementById('6');
six.addEventListener('click', function(){ operationLimiter(6)});
const seven = document.getElementById('7');
seven.addEventListener('click', function(){ operationLimiter(7)});
const eight = document.getElementById('8');
eight.addEventListener('click', function(){ operationLimiter(8)});
const nine = document.getElementById('9');
nine.addEventListener('click', function(){ operationLimiter(9)});

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
// nine.addEventListener('click', function(){ operationLimiter(9)});
const clear = document.getElementById('clear');
// nine.addEventListener('click', function(){ operationLimiter(9)});
const decimal = document.getElementById('.')
// nine.addEventListener('click', function(){ operationLimiter(9)});

// Bools
const isOperator = ('/' || '*' || '-' || '+');
const isFirstInput = operation.length === 0;
const isSecondInput = operation.length === 1;
const isThirdInput = operation.length === 2;
const isFourthInput = operation.length === 3;
let changeSignFlag = false;
let decimalFlag = false;
let decimalTracker = 10;
let numSizeTracker = 10;
