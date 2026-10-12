// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Aim Clicker (idk)";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;
image.style.cursor = "pointer";

const message = document.createElement("p");
message.textContent = "Your project starts here.";

app.append(heading, image, message);

let playerMoney = 0;

const moneyCounter = document.createElement("p");

function updateMoneyDisplay() {
  moneyCounter.textContent = `You have $${playerMoney}`;
}

updateMoneyDisplay();
document.body.appendChild(moneyCounter);

image.addEventListener("click", () => {
  playerMoney += 1;
  updateMoneyDisplay();
  image.style.transform = "scale(0.9)";
  setTimeout(() => {
    image.style.transform = "scale(1)";
  }, 50);
});
