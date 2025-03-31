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

    if (hunger == 0) {
        loc.state = "gameEnd";
        loc.zone = "famine";
    } else if (thirst == 0) {
        loc.state = "gameEnd";
        loc.zone = "dehydration";
    } else if (fuel == 0) {
        loc.state = "gameEnd";
        loc.zone = "fuelRunOut";
    }
}

function resultMountainTrack() {
    if (distance % 10 == 9) {
        if (distance == 89) {
            move(true, "approachDakota");
        } else {
            move(true, "restStopTrack");
        }
    } else if (Math.random() > 0.3) {
        move(true, "mountainTrack");
    } else {
        if (loc.hasEnteredTown == false) {
            loc.hasEnteredTown = true;
        } else {
            loc.curTown++;
        }
        move(true, "townTrack");
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