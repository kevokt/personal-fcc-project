let price = 1.87;
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
priceDisplay.textContent = `Price: $${price}`;

// For displaying cid in cash register
cidList.forEach((price, index) => {
  price.textContent = `$${cid[index][1]}`;
});

btn.addEventListener("click", () => {
  // If customer pays less the price amount
  if (Number(cashInput.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  // If customer pays with the exact amount of price 
  if (Number(cashInput.value) === price) {
    changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }
});