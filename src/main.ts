// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

app.style.display = "flex";
app.style.flexDirection = "column";
app.style.alignItems = "center";
app.style.justifyContent = "center";
app.style.height = "80vh";

const heading = document.createElement("h1");
heading.textContent = "Aim Clicker (idk)";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 192;
image.height = 192;
image.style.cursor = "pointer";

const message = document.createElement("p");
message.textContent = "Your project starts here.";

app.append(heading, image, message);

let playerMoney = 0;
let upgradeOneAmount = 0;
let upgradeTwoAmount = 0;
let upgradeThreeAmount = 0;

let upgradeOneCost = 10;
let upgradeTwoCost = 50;
let upgradeThreeCost = 100;

const moneyCounter = document.createElement("p");
moneyCounter.style.position = "fixed";
moneyCounter.style.top = "10px";
moneyCounter.style.left = "10px";
moneyCounter.style.margin = "0";
moneyCounter.style.fontSize = "36px";

function updateMoneyDisplay() {
  moneyCounter.textContent = `You have $${playerMoney}`;
}

const passiveIncomeCounter = document.createElement("p");
passiveIncomeCounter.style.position = "fixed";
passiveIncomeCounter.style.top = "10px";
passiveIncomeCounter.style.right = "10px";
passiveIncomeCounter.style.margin = "0";
passiveIncomeCounter.style.fontSize = "36px";

function updatePassiveIncomeDisplay() {
  const passiveIncome = (upgradeOneAmount * 1 + upgradeTwoAmount * 3 +
    upgradeThreeAmount * 8) / 5;
  passiveIncomeCounter.textContent =
    `Passive Income: $${passiveIncome} per second`;
}

updateMoneyDisplay();
updatePassiveIncomeDisplay();
document.body.appendChild(moneyCounter);
document.body.appendChild(passiveIncomeCounter);

image.addEventListener("click", () => {
  playerMoney += 1;
  updateMoneyDisplay();
  image.style.transform = "scale(0.9)";
  setTimeout(() => {
    image.style.transform = "scale(1)";
  }, 50);
});

// Purchases 1 upgradeOne, which adds 1 dollar every 5 seconds per upgrade
function buyUpgradeOne() {
  if (playerMoney >= upgradeOneCost) {
    playerMoney -= upgradeOneCost;
    updateMoneyDisplay();
    upgradeOneAmount += 1;
    upgradeOneCost += upgradeOneAmount * 1.5;
    upgradeOneButton.textContent = `Buy Upgrade One ($${upgradeOneCost})`;

    setInterval(() => {
      playerMoney += upgradeOneAmount;
      updateMoneyDisplay();
    }, 5000);
  }
  updatePassiveIncomeDisplay();
}

const upgradeOneButton = document.createElement("button");
upgradeOneButton.textContent = `Buy Upgrade One ($${upgradeOneCost})`;
upgradeOneButton.style.position = "fixed";
upgradeOneButton.style.top = "50px";
upgradeOneButton.style.left = "10px";
upgradeOneButton.addEventListener("click", buyUpgradeOne);
//document.body.appendChild(upgradeOneButton);

// Purchases 1 upgradeTwo, which adds 3 dollars every 5 seconds per upgrade
function buyUpgradeTwo() {
  if (playerMoney >= upgradeTwoCost) {
    playerMoney -= upgradeTwoCost;
    updateMoneyDisplay();
    upgradeTwoAmount += 1;
    upgradeTwoCost += upgradeTwoAmount * 3;
    upgradeTwoButton.textContent = `Buy Upgrade One ($${upgradeTwoCost})`;

    setInterval(() => {
      playerMoney += upgradeTwoAmount * 3;
      updateMoneyDisplay();
    }, 5000);
  }
  updatePassiveIncomeDisplay();
}

const upgradeTwoButton = document.createElement("button");
upgradeTwoButton.textContent = `Buy Upgrade Two ($${upgradeTwoCost})`;
upgradeTwoButton.style.position = "fixed";
upgradeTwoButton.style.top = "90px";
upgradeTwoButton.style.left = "10px";
upgradeTwoButton.addEventListener("click", buyUpgradeTwo);

// Purchases 1 upgradeThree, which adds 8 dollars every 5 seconds per upgrade
function buyUpgradeThree() {
  if (playerMoney >= upgradeThreeCost) {
    playerMoney -= upgradeThreeCost;
    updateMoneyDisplay();
    upgradeThreeAmount += 1;
    upgradeThreeCost += upgradeThreeAmount * 8;
    upgradeThreeButton.textContent = `Buy Upgrade One ($${upgradeThreeCost})`;

    setInterval(() => {
      playerMoney += upgradeThreeAmount * 8;
      updateMoneyDisplay();
    }, 5000);
  }
  updatePassiveIncomeDisplay();
}

const upgradeThreeButton = document.createElement("button");
upgradeThreeButton.textContent = `Buy Upgrade Three ($${upgradeThreeCost})`;
upgradeThreeButton.style.position = "fixed";
upgradeThreeButton.style.top = "130px";
upgradeThreeButton.style.left = "10px";
upgradeThreeButton.addEventListener("click", buyUpgradeThree);

document.body.appendChild(upgradeOneButton);
document.body.appendChild(upgradeTwoButton);
document.body.appendChild(upgradeThreeButton);
