// -----------------------------------------------------------------------------
// VARIABLES
// -----------------------------------------------------------------------------
let num1 = 0;
let num2 = "";
let operator = undefined;
let isNum1Complete = false;
let isRestart = false;

const numberPanel = document.getElementById("number-panel");
numberPanel.addEventListener("click", buttonListener);

function buttonListener(e) {
    const isButton = e.target.nodeName === "BUTTON";
    let buttonValue = e.target.value;

    if (!isButton) {    // the listener is triggered by the div
        return;
    }
    
    if (buttonValue === 'C') {
        clear();
        return;
    }

    if (!isNaN(parseInt(buttonValue))) { // numbers
        if (isRestart) {
            isRestart = false;
            isNum1Complete = false;
            num1 = buttonValue
            num2 = ""
            operator = undefined
            print(num1)
            return
        }

        if (isNum1Complete) {
            num2 += buttonValue
            print(num2)
            return
        } else { // num1 is not complete
            num2 = ""
            operator = undefined;
            if (num1 === 0) {
                num1 = buttonValue;
            } else {
                num1 += buttonValue
            }
            print(num1)
            return
        }
    } else { // symbols + - x / = % .
        if (buttonValue === "=") {
            if (num2 == "") {
                return;
            }
            const solution = operate(operator, num1, num2);
            restartOperation(solution)
            return
        } else {    // + - x / . 
            if (num2 != "") {
                const solution = operate(operator, num1, num2);
                restartOperation(solution)
            }
            operator = buttonValue;
            isNum1Complete = true;
            isRestart = false;
            return
        }
    }
}

// -----------------------------------------------------------------------------

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(Number(a), Number(b));
        case '-':
            return subtract(Number(a), Number(b));
        case 'x':
            return multiply(Number(a), Number(b));
        case '/':
            return divide(Number(a), Number(b));

        default:
            break;
    }
}

function clear() {
    num1 = 0;
    num2 = "";
    operator = undefined;
    isNum1Complete = false;
    isRestart = false
    print(num1);
}

function restartOperation(solution) {
    num1 = solution;
    num2 = "";
    isNum1Complete = true;
    operator = undefined;
    isRestart = true;
    print(solution)
    return
}

// -----------------------------------------------------------------------------
// BASIC MATH FUNCTIONS
// -----------------------------------------------------------------------------
function add(a, b) {
    const solution = a + b;
    restartOperation(solution);
    return solution;
}
function subtract(a, b) {
    const solution = a - b;
    restartOperation(solution);
    return solution;
}
function multiply(a, b) {
    const solution = a * b;
    restartOperation(solution);
    return solution;
}
function divide(a, b) {
    restartOperation();
    if (b === 0) {
        return "ERROR!"
    }
    const solution = a / b;
    restartOperation(solution);
    return solution;
}

// -----------------------------------------------------------------------------

function print(...number) {
    console.log(num1, operator, num2)
    if (number) {
        display.innerText = number;
    }
}
