const number = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const result = document.getElementById("result");
const output = document.getElementById("output");
let num = [1,4,5,9,10,40,50,90,100,400,500,900,1000];
let sym = ["I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M"];
let numeral = [];

// Copied and modifed from 
// www-geeksforgeeks-org: 
// Converting Decimal Number lying between 1 to 3999 to Roman Numerals
const convertToNumerals = number => {
    let i = 12;
    while (number > 0) {
        let div = Math.floor(number/num[i]);
        number = number%num[i];
        while(div--) {
            numeral.push(sym[i]);
        }
        i--;
    }
    result.innerText = numeral.join("");
}

const checkInput = input => {
    if (!input || !isNaN(parseInt(input.value))) {
        result.innerText = "Please enter a valid number";
        output.classList.add("invalidInput");
        return;
    } else if (input < 0) {
        result.innerText = "Please enter a number greater than or equal to 1";
        output.classList.add("invalidInput");
        return;
    } else if (input > 3999) {
        result.innerText = "Please enter a number less than or equal to 3999";
        output.classList.add("invalidInput");
        return;
    }

    convertToNumerals(input);
}

const reset = () => {
    output.classList.remove("hidden");
    output.classList.remove("invalidInput");
    result.innerText = "";
    numeral = [];
}

convertButton.addEventListener("click", () => {
    reset();
    checkInput(number.value);
    number.value = "";
});

number.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        reset();
        checkInput(number.value);
        number.value = "";
    }
})