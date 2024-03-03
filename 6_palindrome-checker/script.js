const inputText = document.getElementById("text-input")
const checkButton = document.getElementById("check-btn")
const output = document.getElementById("output")
const resultShadow = document.getElementById("checker")
let inputString;
let boolean = false;


const getResult = () => {
    inputString = inputText.value;
    if (inputString == "") {
        alert("Please input a value");
        return;
    }
    inputString = cleanString(inputString);
    boolean = isPalindrome(inputString);
    if (boolean != true) {
        output.innerText = `${inputText.value} is not a palindrome.`;
        resultShadow.classList.add('notPalindrome'); 
    } else {
        output.innerText = `${inputText.value} is a palindrome.`;
        resultShadow.classList.remove('notPalindrome');
    }
}

// Step 1 = Remove the punctuation, spaces, symbols
// Step 2 = Make the text uppercase or lowercase
const cleanString = (str) => str.replace(/ /g,"").replace(/[^a-zA-Z0-9]/g,"").toUpperCase();

// Step 3 = Create the algorithm for checking palindrome
// credit = geeksforgeeks palindrome-in-javascript
const isPalindrome = (str) => {
    let j = str.length - 1
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] != str[j]) {
            return false;
        }
        j--;
    }
    return true;
} 

// Step 4 = Output the result
checkButton.addEventListener("click", getResult);
