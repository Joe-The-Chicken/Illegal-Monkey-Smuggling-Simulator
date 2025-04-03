var tries = 0;
var combination = [];

function move(u, a, b) {
    if (gameStarted && u) {
        dayStatUpdate();
    }

    if (b) {
        loc.state = a;
        loc.zone = b;
        if (a == "montana") {
            gameStarted = true;
            showUI();
        }
    } else {
        loc.zone = a;
    }

    if (hunger <= 0) {
        loc.state = "gameEnd";
        loc.zone = "famine";
    } else if (thirst <= 0) {
        loc.state = "gameEnd";
        loc.zone = "dehydration";
    } else if (fuel <= 0) {
        loc.state = "gameEnd";
        loc.zone = "fuelRunOut";
    }
}

function resultMountainTrack() {
    if (distance % 10 == 9) {
        if (distance == 49) {
            move(true, "approachDakota");
        } else {
            move(true, "restStopTrack");
        }
    } else if (Math.random() > 0.33) {
        if (Math.random() > 0.2) {
            // normal movement
            move(true, "mountainTrack");
        } else {
            // random event
            if (high) {
                inventory = banditSteal(inventory);
                move(true, "banditRobHigh");
            } else {
                move(true, "robTutorial");
            }
        }
    } else {
        // locations
        if (Math.random() > 0.3) {
            if (loc.hasEnteredTown == false) {
                loc.hasEnteredTown = true;
            } else {
                loc.curTown++;
            }
            move(true, "townTrack");
        } else if (Math.random() > 0.5) {
            move(true, "casinoTrack");
        } else {
            move(true, "barTrack");
        }
    }
}

function raidBuilding(n) {
    let h = townData[loc.curTown].houses[n];

    if (h.looted) {
        alert("This house has already been looted.");
    } else {
        let amountLoot = (h.size * 2) + Math.ceil(Math.random() * 2);

        let l = generateLoot(amountLoot, h.level, h.type);

        console.log(l);
        if (l != []) {
            for (var i = 0; i < l.length; i++) {
                inventory.push(l[i]);
            }
            l = [];
        }

        showUI();
        h.looted = true;
    }
    move(false, "town");
}

function beginRobberMinigame() {
    combination = [];

    combination.push(Math.ceil(Math.random() * 4));
    combination.push(Math.ceil(Math.random() * 4));
    combination.push(Math.ceil(Math.random() * 4));
    combination.push(Math.ceil(Math.random() * 4));

    tries = 0;
    guessPattern();
}

function guessPattern() {
    var guess = prompt("Enter 4 numbers from 1-4.");
    var correct = 0;

    for (var i = 0; i < 4; i++) {
        if (guess[i] == combination[i]) {
            correct++;
        }
    }

    tries++;

    if (tries == 8) {
        inventory = banditSteal(inventory);
        move(false, "banditRob");
        return;
    }

    if (correct == 0) {
        move(false, "rob0");
        return;
    }
    if (correct == 1) {
        move(false, "rob1");
        return;
    }
    if (correct == 2) {
        move(false, "rob2");
        return;
    }
    if (correct == 3) {
        move(false, "rob3");
        return;
    }
    if (correct == 4) {
        move(false, "banditSucceed");
        return;
    }
}

Array.prototype.removeRandom = function(amount) {
    if (amount >= this.length) {
        this.splice(0, this.length); // Remove all items if amount is greater or equal
        return this;
    }

    for (let i = 0; i < amount; i++) {
        let index = Math.floor(Math.random() * this.length);
        this.splice(index, 1);
    }

    return this;
};

function banditSteal(inv) {
    return inv.filter(item => !(itemList[item] instanceof Valuable));
}