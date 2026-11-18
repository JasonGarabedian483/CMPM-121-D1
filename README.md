# Aim Trainer Clicker

Click a moving target to earn money, then buy upgrades that pay every second.
TypeScript + Vite, built and checked with Deno, deployed on GitHub Pages.

## Play: https://jasongarabedian483.github.io/CMPM-121-D1/

## How to play

Click the red target (it jumps somewhere new every 5 seconds) to earn "Money
per click". Spend that money on upgrades: Accuracy raises money per click, while
New Mouse, Aim Assist, Aimbot and Tracking Drill raise your passive income, which
keeps paying while you do nothing. Each upgrade costs more after every purchase,
and a button turns green when you can afford it.

## How to run program

Player will need [Deno](https://docs.deno.com/runtime/getting_started/installation/) installed, then they follow the steps below in the terminal

```sh
deno task setup # starts up deno
deno task dev   # launches live server to play game
```

## Code map

Everything is in `src/main.ts`:

- the `upgrades` table and `buyUpgrade()` handle creating and purchasing upgrades using currency earned.
- the loop under it that builds one button per row and labels it
- `passiveIncomePerSecond()` is the loop that incrementally gives money to the player based on upgrades.
- the target's click handler, with the 5-second move timer just above it;
- `updateButtonColors()` handles the upgrade buttons changing color based on if they are purchasable or not.

To add an upgrade, add one row with `name`, `amount: 0`, `cost`, `perFiveSeconds`
(money paid per 5 seconds per unit) and `costStep` (price added per unit owned).

## Revision: one model instead of three timers

The first version used multiple duplicated functions to handle each upgrade, with each
having its own `setInterval` to pay out the passive income. This lead to the income not
properly matching the displayed rate.

Now one `buyUpgrade()` handles every upgrade and one loop pays
`passiveIncomePerSecond()` times the real seconds since the last tick
`performance.now()`. Income follows real time and always equals the "$x per
second" readout, and adding the Tracking Drill was one table row instead of
another copied function
([commits](https://github.com/JasonGarabedian483/CMPM-121-D1/commits/main)).

## Credits

Code by Jason Garabedian and Ryan Funk
target SVG by Ryan Funk
hidden button by Oliver Stephenson
