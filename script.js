// Listeners and Display that needs to be updated.
const display = document.querySelector(".display");
const calcs = document.querySelector(".calcs");
const buttons = document.querySelectorAll("button");


//const global variable that handles digits
const currentDigits = [];
const lastOperator = [];
let equalFlag = false;
let currentTotal =0;

//Objects to handle operator or digits
const digits = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
}

const operators = {
    c: "clear",
    backspace: "backspace",
    d: "division",
    m: "multiply",
    s: "subtract",
    a: "add",
    e: "equal",
}

//update display by pressing buttons
buttons.forEach((button) => {
    button.addEventListener('click', () =>{
        handleClick(button.id);
    });
});

//handle clicks
function handleClick(value){
    //Clear if clicked
    if (value == "c") return clear("c");

    //Check if last user input was an operator change if user switches operator
    let lastOperatorUsed = checkIfOperate();

    // check if it was equal that was pressed
    console.log("equal was last used: " + equalFlag);

    if ((lastOperatorUsed ||equalFlag) && currentDigits.length == 1){ // handles second pair of digits
        if (value in digits){ // Let user add second number to operate with
            if(equalFlag) clear("e"); //if equal was pressed last delete current pair of digits
            display.textContent = "";
            display.textContent += value;
            calcs.textContent += value;
            console.log(`${value} was clicked`);
            console.log("i am inside checkifoperate");
        } else{
            calcs.textContent += value;
            display.textcontent = "";
            console.log(`${value} operator used in first if`);
            if(value == "e") equalFlag = True; // flags equal true if pressed
        }
    } else if(equalFlag && value in digits){ // when pressed equal -> then press number clear everything
        clear("e");
        display.textContent = value;
    }
    else if (value in digits){ // handle digit clicks
        display.textContent += value;
        calcs.textContent += value;
        console.log(`${value} was clicked`);
    } else if(value in operators && display.textContent == ""){ // handle operation click with empty start input
        currentDigits.push(0);
        calcs.textContent += 0;
        console.log("zero was added because no number provided")
    } else if(value in operators){ // handle operator clicks
        calcs.textContent += value;
        currentDigits.push(display.textContent);
        display.textcontent = "";
        console.log(`${value} operator used in last`)
        if(value == "e") equalFlag = true; //flags equal true if pressed
    }

    if(currentDigits.length == 2){ // handle operation when digits have formed a pair
        console.log("I should probably operate now");
        console.log("i should operate with " + value);
        currentDigits.push(display.textContent);
        operate(lastOperator.slice(-1)[0]);

        calcs.textContent += currentTotal;
        calcs.textContent += value; // get last if value is not equal to e
        
        console.log("double operation move succesful");
    }
}

//check if we do operation or store number
function checkIfOperate(){
    console.log("I checked operation")
    lastInput = calcs.textContent.slice(-1);
    console.log(lastInput);
    console.log(lastInput in operators);
    console.log(lastInput)
    if(lastInput in operators){
        lastOperator.push(lastInput);
        return lastInput;
    } else{
        return false;
    }
}

// Operators
function add(a,b){
    return parseInt(a)+parseInt(b);
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function equals(a,b){
    return a+b;
}
function operate(operator){
    console.log("beginning of operate with operator: " + operator);
    let result;

    if(operator == "e"){
        lastOperatorUsed = (lastOperator.slice(-1))[0];
        console.log("equal says: " + lastOperatorUsed);
        lastOperator.push("e");
        equalFlag= true;
    } else{
        lastOperatorUsed = operator;
        equalFlag = false;
    }
    console.log("Switch checks right now: "+ lastOperatorUsed);
    console.log("switch type is: " + typeof(lastOperatorUsed));
    switch(lastOperatorUsed){
        case 'a':
            result = add(currentDigits[0],currentDigits[1]);
            updateOperation(result);
            lastOperator.push("a");
            break;
        case 's':
            result = subtract(currentDigits[0],currentDigits[1]);
            updateOperation(result);
            lastOperator.push("s");
            break;
        case 'm':
            result = multiply(currentDigits[0],currentDigits[1]);
            updateOperation(result);
            lastOperator.push("m");
            break;
        case 'd':
            if(currentDigits[1] == "0"){//handle divison by zero, reset calculator
                display.textContent = "eroror";
                currentTotal = 0;
                currentDigits.length = 0;
                lastOperator.length = 0;
            } else{
                result = divide(currentDigits[0],currentDigits[1]);
                updateOperation(result);
                lastOperator.push("d");
            }
            break;
        
        default:
            console.log("ADD WAS NOT USED");
            break;
    }
}

//Clear types
function clear(type){
    switch(type){
        case "e":
            calcs.textContent = "";
            currentDigits.length = 0;
            currentTotal = 0;
            lastOperator.length = 0;
            break;
        case "c":
            calcs.textContent="";
            currentDigits.length = 0;
            lastOperator.length = 0;
            display.textContent ="";
            currentTotal = 0;
            equalFlag = false;
            break;
    }
}

function updateOperation(result){ //Calculates and updates the variable storage and UI.
    display.textContent = result;
    currentTotal = result;
    currentDigits.length = 0;
    currentDigits.push(currentTotal);
}