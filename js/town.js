var townData = [];

const houseNames = [
    "house1",
    "house2",
    "house3",
    "house4",
    "house5"
]

class Town {
    constructor(houses, responses, currentBuilding) {
        this.houses = houses;
        this.houseInteract = responses;
    }
}

class Building {
    constructor(size, level, type) {
        this.type = type;
        this.size = size;
        this.level = level;
        this.looted = false;
    }
}

function getHouses() {
    return Object.keys(townData.houses);
}

function getHouseInteract() {
    return townData.houseInteract;
}

function generateTown(n) {
    var townLevel = 1
    for (var j = 0; j < n; j++) {
        curTown = {};
        curResponse = [];

        curTown["Town Hall"] = new Building(Math.floor(Math.random() * 2), townLevel, "hall");
        curResponse.push(() => move(false, "bank"));

        curTown["Trading Post"] = {};
        curResponse.push(() => move(false, "tradingPost"));

        for (var i = 0; i < Math.ceil(Math.random() * 5); i++) {
            curTown["Building " + (i + 1)] = new Building(
                Math.floor(Math.random() * 2), townLevel, ["house", "house", "garden"][Math.floor(Math.random() * 4)]
            );

            let h = houseNames[i];
            curResponse.push(() => move(false, h));
        }

        curTown["Leave"] = {}
        curResponse.push(() => resultMountainTrack());

        console.log(new Town(curTown, curResponse, 0));

        townData.push(new Town(curTown, curResponse, 0));
    }
}