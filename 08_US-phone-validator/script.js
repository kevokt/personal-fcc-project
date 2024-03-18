const input = document.getElementById("user-input");
const check = document.getElementById("check-btn");
const clear = document.getElementById("clear-btn");
const result = document.getElementById("results-div");
const resultDiv = document.getElementById("results-div");
const validRegex = [
    // 555-555-5555
    /^\d{3}-\d{3}-\d{4}$/,

    // 1 555-555-5555
    /^1 \d{3}-\d{3}-\d{4}$/,

    // 1 (555) 555-5555
    /^1 \(\d{3}\) \d{3}-\d{4}$/,

    // 5555555555
    /^\d{10}$/,

    // (555)555-5555
    /^\(\d{3}\)\d{3}-\d{4}$/,

    // 1 555 555 5555
    /^1 \d{3} \d{3} \d{4}$/,

    // 1(555)555-5555
    /1\(\d{3}\)\d{3}-\d{4}/
  ];

const isValid = (input) => validRegex.some(regex => regex.test(input))

const checkAnimation = () => {
    resultDiv.classList.add("check-animation");
    setTimeout(() => resultDiv.classList.remove("check-animation"), 2000);
}

const checkAnimationInvalid = () => {
    resultDiv.classList.add("check-animation-invalid");
    setTimeout(() => resultDiv.classList.remove("check-animation-invalid"), 2000);
}

const clearAnimation = () => {
    resultDiv.classList.add("clear-animation");
    setTimeout(() => resultDiv.classList.remove("clear-animation"), 2000);
}

check.addEventListener("click", () => {
    if (input.value === "") {
        alert("Please provide a phone number");
        return;
    }
    // result.innerHTML += isValid(input.value) 
    // ? `<p class="valid-result">Valid US number:<br>${input.value}</p>`
    // : `<p class="invalid-result">Invalid US number:<br>${input.value}</p>`
    if (isValid(input.value)) {
        checkAnimation();
        result.innerHTML += `<p class="valid-result">Valid US number:<br>${input.value}</p>`
    } else {
        checkAnimationInvalid();
        result.innerHTML += `<p class="invalid-result">Invalid US number:<br>${input.value}</p>`
    }
    input.value = "";
})

clear.addEventListener("click", () => {
    result.innerHTML = "";
    clearAnimation();
});
