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

// type to define upgrade
type Upgrade = {
  name: string;
  amount: number;
  cost: number;
  // Money paid every 5 seconds per unit owned, and how much the price grows.
  perFiveSeconds: number;
  costStep: number;
  button?: HTMLButtonElement;
};

// creation of upgrades
const upgrades: Upgrade[] = [
  { name: "New Mouse", amount: 0, cost: 10, perFiveSeconds: 1, costStep: 1.5 },
  { name: "Aim Assist", amount: 0, cost: 50, perFiveSeconds: 3, costStep: 3 },
  { name: "Aimbot", amount: 0, cost: 100, perFiveSeconds: 8, costStep: 8 },
  {
    name: "Tracking Drill",
    amount: 0,
    cost: 250,
    perFiveSeconds: 20,
    costStep: 20,
  },
];

let clickValue = 1;
let clickUpgradeCost = 25;

const moneyCounter = document.createElement("p");
moneyCounter.style.position = "fixed";
moneyCounter.style.top = "10px";
moneyCounter.style.left = "10px";
moneyCounter.style.margin = "0";
moneyCounter.style.fontSize = "36px";

function updateMoneyDisplay() {
  moneyCounter.textContent = `You have $${playerMoney.toFixed(2)}`;
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

// passive income from upgrades
function passiveIncomePerSecond() {
  const perFiveSeconds = upgrades.reduce(
    (sum, upgrade) => sum + upgrade.amount * upgrade.perFiveSeconds,
    0,
  );
  return perFiveSeconds / 5;
}

function updatePassiveIncomeDisplay() {
  const passiveIncome = passiveIncomePerSecond();
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
  image.style.filter = "brightness(0.5)";
  setTimeout(() => {
    image.style.transform = "scale(1)";
    image.style.filter = "brightness(1)";
  }, 50);
});

const clickUpgradeButton = document.createElement("button");
clickUpgradeButton.style.position = "fixed";
clickUpgradeButton.style.top = "220px";
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

// buying first upgrade function
function buyUpgrade(upgrade: Upgrade) {
  if (playerMoney < upgrade.cost) return;

  playerMoney -= upgrade.cost;
  upgrade.amount += 1;
  upgrade.cost += upgrade.amount * upgrade.costStep;
  updateMoneyDisplay();
  updatePassiveIncomeDisplay();
  updateUpgradeButtons();
}

// buying more upgrades function
// Solved the "Duplicated Code" code smell by creating a function to handle all upgrades, rather than calling each individual function
function updateUpgradeButtons() {
  for (const upgrade of upgrades) {
    const verb = upgrade.amount === 0 ? "Buy" : "Upgrade";
    const perSecond = upgrade.perFiveSeconds / 5;
    upgrade.button!.textContent =
      `${verb} ${upgrade.name} ($${upgrade.cost}) ($${perSecond} per second)`;
  }
}

// upgrade buttons
// Solved the "Duplicated Code" code smell by creating a function to handle all upgrades, rather than calling each individual function
for (const [index, upgrade] of upgrades.entries()) {
  const button = document.createElement("button");
  button.style.position = "fixed";
  button.style.top = `${60 + index * 40}px`;
  button.style.left = "10px";
  button.addEventListener("click", () => buyUpgrade(upgrade));
  upgrade.button = button;
  document.body.appendChild(button);
}

// button stylization
function styleButton(button: HTMLButtonElement) {
  button.style.backgroundColor = "#c8102e";
  button.style.color = "#ffffff";
  button.style.border = "2px solid #c8102e";
  button.style.borderRadius = "6px";
  button.style.padding = "6px 10px";
  button.style.fontFamily = "inherit";
  button.style.cursor = "pointer";
}

styleButton(clickUpgradeButton);
upgrades.forEach((upgrade) => styleButton(upgrade.button!));
updateUpgradeButtons();

function updateButtonColors() {
  const buttons: [HTMLButtonElement, number][] = [
    [clickUpgradeButton, clickUpgradeCost],
    ...upgrades.map((upgrade): [HTMLButtonElement, number] => [
      upgrade.button!,
      upgrade.cost,
    ]),
  ];
  for (const [button, cost] of buttons) {
    const color = playerMoney >= cost ? "#2e9e44" : "#c8102e";
    button.style.backgroundColor = color;
    button.style.borderColor = color;
  }
}

// Oliver Stephenson - Section 3 Fork
function hiddenButton(button: HTMLButtonElement) {
  button.style.opacity = "0";
  button.style.color = "#ffffff";
  button.style.border = "2px";
  button.style.borderRadius = "6px";
  button.style.cursor = "pointer";
}

const secretButton = document.createElement("button");
secretButton.textContent = "Get 100 Money";
secretButton.style.position = "fixed";
secretButton.style.bottom = "0";
secretButton.style.right = "0";

hiddenButton(secretButton);

secretButton.addEventListener("click", () => {
  playerMoney += 100;
  updateMoneyDisplay();
  updateButtonColors();
});

document.body.appendChild(secretButton);

let lastTick = performance.now();

setInterval(() => {
  const now = performance.now();
  const elapsedSeconds = (now - lastTick) / 1000;
  lastTick = now;

  playerMoney += passiveIncomePerSecond() * elapsedSeconds;
  updateMoneyDisplay();
}, 100);

setInterval(updateButtonColors, 100);
updateButtonColors();
