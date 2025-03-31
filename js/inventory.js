let money = 50;
let hunger = 100;
let thirst = 100;
let fuel = 50;
let distance = 1;

let inventory = []

function dayStatUpdate() {
    hunger -= 5;
    thirst -= 5;
    fuel -= 5;
    distance += 1;
    showUI();
}

function showUI() {
    document.getElementById("stats").textContent = "Miles: " + (distance * 5) + " - Hunger: " + hunger + " - Thirst: " + thirst + " - Money: " + money + " - Fuel: " + fuel;
    showInventory(inventory);
}