function purchase(item, where) {
    if (money < Math.floor(itemList[item].value * (3 / 2))) {
        alert("Surely you paid enough attention in school to know you can't afford this.");
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
    } else if (loc.zone == "roulette") {
        if (itemList[inventory[index]].value >= 5 || itemList[inventory[index]].value >= 5) {
            var choice = prompt(`What would you like to bet "${itemName}" on?\n1. Color\n2. Portion`);

            if (choice == "1") {
                choice = prompt(`What color would you like to bet on?\n1. Red (Odd)\n2. Black (Even)`);

                if (choice == 1 || choice == 2) {
                    var spin = Math.ceil(Math.random() * 36);
                    var evenOdd = spin % 2;
                    var pick = choice % 2;

                    if (evenOdd == pick) {
                        gambleWinItem(index, 1);
                        alert(`It was ${spin}. You won!`);
                    } else {
                        gambleLoseItem(index);
                        alert(`It was ${spin}. You lost.`);
                    }
                }
            } else if (choice == "2") {
                choice = prompt(`What range would you like to bet on?\n1. 1-12\n2. 13-24\n3. 25-36`);

                if (choice == 1 || choice == 2 || choice == 3) {
                    var spin = Math.ceil(Math.random() * 36);
                    var section = Math.ceil(spin / 12);

                    if (section == choice) {
                        gambleWinItem(index, 2);
                        alert(`It was ${spin}. You won!`);
                    } else {
                        gambleLoseItem(index);
                        alert(`It was ${spin}. You lost.`);
                    }
                }
            }
        } else {
            alert("You can't gamble with that! The minimum value of something you can gamble is $5!");
        }
    } else if (loc.zone == "blackjack") {
        if (itemList[inventory[index]].value >= 5 || itemList[inventory[index]].value >= 5) {
            blackjack(index);
        } else {
            alert("You can't gamble with that! The minimum value of something you can gamble is $5!");
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

    if (itemData.alcoholic) {
        high = true;
        highTicks = 5;
    }
}

function gambleLoseItem(index) {
    let itemName = inventory[index];

    inventory.splice(index, 1);
    document.getElementById("last").textContent = (`(Gambled ${itemName}. - Lost ${itemName})`);
}

function gambleWinItem(index, amount) {
    let itemName = inventory[index];

    for (var i = 0; i < amount; i++) {
        inventory.push(itemName);
    }

    document.getElementById("last").textContent = (`(Gambled ${itemName}. - Gained ${amount} ${itemName})`);
}

function blackjack(index) {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, "a"]
    var hand = [];
    var stand = false;

    hand.push(cards[Math.floor(Math.random() * cards.length)]);
    hand.push(cards[Math.floor(Math.random() * cards.length)]);

    var total = getTotalHand(hand);

    while (1 == 1) {
        var choice = prompt(`Current Hand: ${hand.toString()} (${total}).\n1. Stand\n2. Hit`);
        if (choice == "1") {
            stand = true;
        } else if (choice == "2") {
            hand.push(cards[Math.floor(Math.random() * cards.length)]);
        }
        var total = getTotalHand(hand);

        if (total >= 21 || stand) {
            console.log(total);
            alert(`Current Hand: ${hand.toString()} (${total}).`);
            break;
        }
    }

    var total = getTotalHand(hand);

    const playerTotal = total;

    if (playerTotal > 21) {
        alert(`Current Hand: ${hand.toString()} (${total}). You busted!`);
        gambleLoseItem(index);
        return;
    }

    hand = [];
    hand.push(cards[Math.floor(Math.random() * cards.length)]);
    hand.push(cards[Math.floor(Math.random() * cards.length)]);

    var total = getTotalHand(hand);

    if (total > playerTotal) {
        alert(`Dealer Hand: ${hand.toString()} (${total}). Dealer got a higher score. You lose!`);
        gambleLoseItem(index);
        return;
    }

    if (total == 21 && playerTotal == 21) {
        alert(`Dealer Hand: ${hand.toString()} (${total}). It's a tie!`)
        return;
    }

    while (1 == 1) {
        alert(`Dealer Hand: ${hand.toString()} (${total}).`);

        hand.push(cards[Math.floor(Math.random() * cards.length)]);

        var total = getTotalHand(hand);

        if (total >= 21 || total > playerTotal) {
            console.log(total);
            break;
        }
    }

    if (total > 21) {
        alert(`Dealer Hand: ${hand.toString()} (${total}). Dealer busted! You won!`);
        gambleWinItem(index, 1);
        return;
    }

    if (total > playerTotal) {
        alert(`Dealer Hand: ${hand.toString()} (${total}). Dealer got a higher score. You lose!`);
        gambleLoseItem(index);
        return;
    }

    if (total == 21 && playerTotal == 21) {
        alert(`Dealer Hand: ${hand.toString()} (${total}). It's a tie!`)
        return;
    }
}

function getTotalHand(h) {
    var a = 0;
    var aces = 0;
    for (var i = 0; i < h.length; i++) {
        if (h[i] == "a") {
            aces++;
            a += 11;
        } else {
            a += h[i];
        }
    }
    console.log(`Total (Start): ${a}, Aces: ${aces}`);

    if (a <= 21) {
        return a;
    }

    if (aces == 0) {
        return a;
    }

    for (var i = 0; i < aces; i++) {
        a += -10;

        if (a <= 21) {
            return a;
        }
    }

    return a;
}