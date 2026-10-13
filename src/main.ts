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

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Bungee&display=swap";
document.head.appendChild(fontLink);

document.title = "Aim Trainer Clicker";
document.body.style.backgroundColor = "#ffffff";
document.body.style.color = "#c8102e";
document.body.style.fontFamily = "'Bungee', sans-serif";

const heading = document.createElement("h1");
heading.textContent = "Aim Trainer Clicker";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A red target";
image.width = 192;
image.height = 192;
image.style.cursor = "pointer";

setInterval(() => {
  const maxX = globalThis.innerWidth - image.width;
  const maxY = globalThis.innerHeight - image.height;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  image.style.position = "fixed";
  image.style.left = `${randomX}px`;
  image.style.top = `${randomY}px`;
}, 5000);

const message = document.createElement("p");
message.textContent = "Click the target!";

app.append(heading, image, message);

let playerMoney = 0;

let upgradeOneAmount = 0;
let upgradeTwoAmount = 0;
let upgradeThreeAmount = 0;
let upgradeOneCost = 10;
let upgradeTwoCost = 50;
let upgradeThreeCost = 100;

let clickValue = 1;
let clickUpgradeCost = 25;

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

const clickValueCounter = document.createElement("p");
clickValueCounter.style.position = "fixed";
clickValueCounter.style.top = "56px";
clickValueCounter.style.right = "10px";
clickValueCounter.style.margin = "0";
clickValueCounter.style.fontSize = "36px";
document.body.appendChild(clickValueCounter);

function updateClickValueDisplay() {
  clickValueCounter.textContent = `Money per click: $${clickValue}`;
}

function updatePassiveIncomeDisplay() {
  const passiveIncome = (upgradeOneAmount * 1 + upgradeTwoAmount * 3 +
    upgradeThreeAmount * 8) / 5;
  passiveIncomeCounter.textContent =
    `Passive Income: $${passiveIncome} per second`;
}

updateMoneyDisplay();
updateClickValueDisplay();
updatePassiveIncomeDisplay();
document.body.appendChild(moneyCounter);
document.body.appendChild(passiveIncomeCounter);

image.addEventListener("click", () => {
  playerMoney += clickValue;
  updateMoneyDisplay();
  updateClickValueDisplay();
  image.style.transform = "scale(0.9)";
  setTimeout(() => {
    image.style.transform = "scale(1)";
  }, 50);
});

const clickUpgradeButton = document.createElement("button");
clickUpgradeButton.style.position = "fixed";
clickUpgradeButton.style.top = "180px";
clickUpgradeButton.style.left = "10px";
document.body.appendChild(clickUpgradeButton);

function updateClickUpgradeButton() {
  clickUpgradeButton.textContent = `Upgrade Accuracy ($${clickUpgradeCost})`;
}

clickUpgradeButton.addEventListener("click", () => {
  if (playerMoney >= clickUpgradeCost) {
    playerMoney -= clickUpgradeCost;
    clickValue += 1;
    clickUpgradeCost = Math.ceil(clickUpgradeCost * 1.5);
    updateMoneyDisplay();
    updateClickValueDisplay();
    updateClickUpgradeButton();
  }
});

updateClickValueDisplay();
updateClickUpgradeButton();
// Purchases 1 upgradeOne, which adds 1 dollar every 5 seconds per upgrade
function buyUpgradeOne() {
  if (playerMoney >= upgradeOneCost) {
    playerMoney -= upgradeOneCost;
    updateMoneyDisplay();
    upgradeOneAmount += 1;
    upgradeOneCost += upgradeOneAmount * 1.5;
    upgradeOneButton.textContent =
      `Upgrade New Mouse ($${upgradeOneCost}) ($0.2 per second)`;

    setInterval(() => {
      playerMoney += upgradeOneAmount;
      updateMoneyDisplay();
    }, 5000);
  }
  updatePassiveIncomeDisplay();
}

const upgradeOneButton = document.createElement("button");
upgradeOneButton.textContent =
  `Buy New Mouse ($${upgradeOneCost}) ($0.2 per second)`;
upgradeOneButton.style.position = "fixed";
upgradeOneButton.style.top = "60px";
upgradeOneButton.style.left = "10px";
upgradeOneButton.addEventListener("click", buyUpgradeOne);

// Purchases 1 upgradeTwo, which adds 3 dollars every 5 seconds per upgrade
function buyUpgradeTwo() {
  if (playerMoney >= upgradeTwoCost) {
    playerMoney -= upgradeTwoCost;
    updateMoneyDisplay();
    upgradeTwoAmount += 1;
    upgradeTwoCost += upgradeTwoAmount * 3;
    upgradeTwoButton.textContent =
      `Upgrade Aim Assist ($${upgradeTwoCost}) ($0.6 per second)`;

    setInterval(() => {
      playerMoney += upgradeTwoAmount * 3;
      updateMoneyDisplay();
    }, 5000);
  }
  updatePassiveIncomeDisplay();
}

const upgradeTwoButton = document.createElement("button");
upgradeTwoButton.textContent =
  `Buy Aim Assist ($${upgradeTwoCost}) ($0.6 per second)`;
upgradeTwoButton.style.position = "fixed";
upgradeTwoButton.style.top = "100px";
upgradeTwoButton.style.left = "10px";
upgradeTwoButton.addEventListener("click", buyUpgradeTwo);

// Purchases 1 upgradeThree, which adds 8 dollars every 5 seconds per upgrade
function buyUpgradeThree() {
  if (playerMoney >= upgradeThreeCost) {
    playerMoney -= upgradeThreeCost;
    updateMoneyDisplay();
    upgradeThreeAmount += 1;
    upgradeThreeCost += upgradeThreeAmount * 8;
    upgradeThreeButton.textContent =
      `Upgrade AimBot ($${upgradeThreeCost}) ($1.6 per second)`;

    setInterval(() => {
      playerMoney += upgradeThreeAmount * 8;
      updateMoneyDisplay();
    }, 5000);
  }
  updatePassiveIncomeDisplay();
}

const upgradeThreeButton = document.createElement("button");
upgradeThreeButton.textContent =
  `Buy Aimbot ($${upgradeThreeCost}) ($1.6 per second)`;
upgradeThreeButton.style.position = "fixed";
upgradeThreeButton.style.top = "140px";
upgradeThreeButton.style.left = "10px";
upgradeThreeButton.addEventListener("click", buyUpgradeThree);

document.body.appendChild(upgradeOneButton);
document.body.appendChild(upgradeTwoButton);
document.body.appendChild(upgradeThreeButton);

function styleButton(button: HTMLButtonElement) {
  button.style.backgroundColor = "#c8102e";
  button.style.color = "#ffffff";
  button.style.border = "2px solid #c8102e";
  button.style.borderRadius = "6px";
  button.style.padding = "6px 10px";
  button.style.fontFamily = "inherit";
  button.style.cursor = "pointer";
}

[clickUpgradeButton, upgradeOneButton, upgradeTwoButton, upgradeThreeButton]
  .forEach(styleButton);

function updateButtonColors() {
  const buttons: [HTMLButtonElement, number][] = [
    [clickUpgradeButton, clickUpgradeCost],
    [upgradeOneButton, upgradeOneCost],
    [upgradeTwoButton, upgradeTwoCost],
    [upgradeThreeButton, upgradeThreeCost],
  ];
  for (const [button, cost] of buttons) {
    const color = playerMoney >= cost ? "#2e9e44" : "#c8102e";
    button.style.backgroundColor = color;
    button.style.borderColor = color;
  }
}

setInterval(updateButtonColors, 100);
updateButtonColors();
