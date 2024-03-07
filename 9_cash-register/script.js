// ORIGINAL PRICES AND CID
// let price = 1.87;
// let cid = [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ];

let price = 19.50;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const changeDue = document.getElementById("change-due");
const cashInput = document.getElementById("cash");
const btn = document.getElementById("purchase-btn");
const priceDisplay = document.querySelector(".price");
const cidList = document.querySelectorAll("span");

// For displaying price in cash Register
priceDisplay.textContent = `Price: $${price.toString()}`;

// For displaying cid in cash register
cidList.forEach((price, index) => {
  price.textContent = `$${cid[index][1]}`;
});

const calculateCID = (cid) => {
  var totalCID = 0;
  for (var i = 0; i < cid.length - 1; i++){
    totalCID += cid[i][1];
  }
  return totalCID.toFixed(2);
} 

const checkCashRegister = () => {
  // If customer pays less the price amount
  if (Number(cashInput.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  // If customer pays with the exact amount of price 
  if (Number(cashInput.value) === price) {
    changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    cashInput.value = "";
    return;
  }

// now to make the algorithm for calculating the cash register
// -make status case 1b (cannot return the exact change)
// -make status case 2 
// -make status case 3 (hopefully i can figure it out on my own ;_;)
  const totalCID = calculateCID(cid);
  const change = (cashInput.value - price).toFixed(2);
  
  // CASE 1A: IF totalCID < cash
  if (totalCID < Number(cashInput.value)) {
    changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
  } 
}

// Call checkCashRegister when Purchase button is clicked
btn.addEventListener("click", () => checkCashRegister());

// Call checkCashRegister when enter is pressed
cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkCashRegister();
  }
})