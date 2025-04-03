let money = 50;
let hunger = 100;
let thirst = 100;
let fuel = 100;
let distance = 1;
let high = false;
let highTicks = 0;

let inventory = []

function dayStatUpdate() {
    hunger -= 5;
    thirst -= 5;
    fuel -= 10;
    distance += 1;
    if (high) {
        highTicks -= 1;
        if (highTicks == 0) {
            high = false;
        }
    }
    showUI();
}

function showUI() {
    document.getElementById("stats").textContent = "Miles: " + (distance * 5) + " - Hunger: " + hunger + " - Thirst: " + thirst + " - Money: " + money + " - Fuel: " + fuel;
    showInventory(inventory);
}