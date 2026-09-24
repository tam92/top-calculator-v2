// -----------------------------------------------------------------------------
// VARIABLES
// -----------------------------------------------------------------------------
let num1 = 0;
let num2 = "";
let operator = undefined;
let isNum1Complete = false;
let isRestart = false;

const numberPanel = document.getElementById("number-panel");
window.addEventListener("keydown", buttonListener);
numberPanel.focus() // so it captures keydown event
numberPanel.addEventListener("click", buttonListener);

function buttonListener(e) {
    const isButton = e.target.nodeName === "BUTTON" || e.target.nodeName === "BODY";
    let buttonValue = e.target.value;
    if (e.type == "keydown") {
        buttonValue = e.key;
    }

    if (!isButton) {    // the listener is triggered by the div
        return;
    }
    
    if (buttonValue === 'C' || buttonValue == 'c') {
        clear();
        return;
    }

    if (buttonValue === "back-arrow") { // delete last char
        
        if (isNum1Complete && num2.length > 0) {
            if (num2[num2.length - 1] == '.') {
                document.getElementById("decimal-btn").disabled = false
            }
            num2 = num2.substring(0, num2.length - 1);
            print(num2)
        } else {
            if (num1.length > 0) {
                if (num1[num1.length - 1] == '.') {
                    document.getElementById("decimal-btn").disabled = false
                }
                num1 = num1.substring(0, num1.length - 1)
                print(num1)
            }
        }
        return;
    }

    if (buttonValue === '.') { // decimals
        if (isNum1Complete) {
            if (num2 == 0) {
                num2 = '0.'
            } else {
                num2 += '.'
            }
            print(num2)
        } else {
            num1 += '.'
            print(num1)
        }
        e.target.disabled = true
        return
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
    } else if (buttonValue == '+' || buttonValue == '-' || buttonValue == '*' ||
        buttonValue == "x" || buttonValue == '/' || buttonValue == '=') {
        document.getElementById("decimal-btn").disabled = false;
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
        case '*':
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
    document.getElementById("decimal-btn").disabled = false;
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
    const solution = roundToSixDecimals(a + b);
    restartOperation(solution);
    return solution;
}
function subtract(a, b) {
    const solution = roundToSixDecimals(a - b);
    restartOperation(solution);
    return solution;
}
function multiply(a, b) {
    const solution = roundToSixDecimals(a * b);
    restartOperation(solution);
    return solution;
}
function divide(a, b) {
    restartOperation();
    if (b === 0) {
        return "ERROR!"
    }
    const solution = roundToSixDecimals(a / b);
    restartOperation(solution);
    return solution;
}

// -----------------------------------------------------------------------------

function print(...number) {
    console.log(num1, operator, num2)
    if (number == 0) {
        display.innerText = 0
        return
    }
    if (number) {
        const str = number.toString()
        display.innerText = str.replace(/^0+(?!.)/, '');
    }
}

function roundToSixDecimals(number) {
    return Math.round(number * 1000000) / 1000000;
}