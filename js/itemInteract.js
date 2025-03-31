function purchase(item, where) {
    if (money < Math.floor(itemList[item].value * (3 / 2))) {
        alert("Surely you paid enough attention in school to know you can't afford this.")
    } else {
        money -= Math.floor(itemList[item].value * (3 / 2));
        inventory.push(item);
        showUI();
    }
    move(false, where);
}

function handleItemClick(index) {
    let itemName = inventory[index];
    let itemData = itemList[itemName];

    if (!itemData) {
        console.log("Invalid item.");
        return;
    }

    if (areas[loc.state][loc.zone].barter) {
        var choice = prompt(`Would you like to sell "${itemName}" for $${itemData.value}?\n1. Yes\n2. No`);

        if (choice === "1") {
            sellItem(index);
        }
    } else {
        if (itemData.type === "fuel") {
            var choice = prompt(`What do you want to do with "${itemName}"?\n1. Burn\n2. Inspect`);
        } else if (itemData.type === "food") {
            var choice = prompt(`What do you want to do with "${itemName}"?\n1. Eat\n2. Inspect`);
        } else if (itemData.type === "drink") {
            var choice = prompt(`What do you want to do with "${itemName}"?\n1. Drink\n2. Inspect`);
        } else {
            var choice = prompt(`What do you want to do with "${itemName}"?\n1. Inspect`);
        }

        if (choice === "1" && itemData.type === "fuel") {
            burnItem(index);
        } else if (choice === "1" && itemData.type === "food") {
            eatItem(index);
        } else if (choice === "1" && itemData.type === "drink") {
            drinkItem(index);
        } else if (choice != null) {
            alert(itemData.description);
        }
    }

    showUI();
}

function burnItem(index) {
    let itemName = inventory[index];
    let itemData = itemList[itemName];
    if (typeof itemData.fuel == "object") {
        var thisFuel = Math.floor(itemData.fuel[0] + Math.random() * itemData.fuel[1]);
    } else {
        var thisFuel = itemData.fuel;
    }

    if (itemData && itemData.type === "fuel") {
        fuel += thisFuel;
        inventory.splice(index, 1);
        document.getElementById("last").textContent = (`(Burned ${itemName} (${thisFuel}). Fuel is now ${fuel}.)`);
    }
}

function sellItem(index) {
    let itemName = inventory[index];
    let itemData = itemList[itemName];

    if (itemData) {
        money += itemData.value;
        inventory.splice(index, 1);
        document.getElementById("last").textContent = (`(Sold ${itemName}. Money is now ${money}.)`);
    }
}

function eatItem(index) {
    let itemName = inventory[index];
    let itemData = itemList[itemName];

    if (itemData && itemData.type === "food") {
        hunger += itemData.food;
        inventory.splice(index, 1);
        document.getElementById("last").textContent = (`(Ate ${itemName}. - Hunger is now ${hunger})`);
    }
}

function drinkItem(index) {
    let itemName = inventory[index];
    let itemData = itemList[itemName];

    if (itemData && itemData.type === "drink") {
        thirst += itemData.thirsty;
        inventory.splice(index, 1);
        document.getElementById("last").textContent = (`(Drank ${itemName}. - Thirst is now ${thirst})`);
    }
}