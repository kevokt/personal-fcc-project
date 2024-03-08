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

const updateUI = (change) => {
  // For displaying price in cash Register
  priceDisplay.textContent = `Price: $${price.toString()}`;

  // For displaying cid in cash register
  cidList.forEach((price, index) => {
    price.textContent = `$${cid[index][1]}`;
  });

  // Update cid in cash register
  if (change) {
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    })
  }
}

const displayResult = (status, change) => {
  changeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.map(money => changeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`);
} 

const calculateCID = (cid) => {
  var totalCID = 0;
  for (var i = 0; i < cid.length; i++) {
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

  let totalCID = calculateCID(cid);
  let change = Number(cashInput.value) - price;
  let reversedCID = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = {
    status: "OPEN",
    change: []
  }

  if (totalCID < change) {
    changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
  }

  if (totalCID === change) {
    result.status = 'CLOSED';
  }

  for (let i = 0; i <= reversedCID.length; i++) {
    if (change > denominations[i] && change > 0) {
      let count = 0;
      let total = reversedCID[i][1];
      while (total > 0 && change >= denominations[i]) {
        total -= denominations[i];
        change = parseFloat((change -= denominations[i]).toFixed(2));
        count++;
      }
      if (count > 0) {
        result.change.push([reversedCID[i][0], count * denominations[i]]);
      }
    }
  }
  if (change > 0) {
    return (changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`);
  }
  console.log(result);

  result.status = calculateCID(cid) < 1 ? "CLOSED" : "OPEN";
  displayResult(result.status, result.change);
  updateUI(result.change);
  
}


// Call checkCashRegister when Purchase button is clicked
btn.addEventListener("click", () => checkCashRegister());

// Call checkCashRegister when enter is pressed
cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkCashRegister();
  }
})

updateUI();