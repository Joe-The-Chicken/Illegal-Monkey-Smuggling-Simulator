class Pool {
    constructor(items) {
        this.pool = items.flat();
    }
}

function poolItem(itm, wgt) {
    return Array(wgt).fill(itm);
}

const lootPool = {
    "house": new Pool([
        // Common Items - 63%
        poolItem("Small Wood Log", 20),
        poolItem("Wood Spoon", 20),
        poolItem("Newspapers", 20),
        poolItem("Fingernail Clippings", 20),
        poolItem("Cockroach", 20),
        poolItem("Finger", 20),
        // Rare Items - 26%
        poolItem("Wood Log", 10),
        poolItem("Wood Chair", 10),
        poolItem("Wood Table", 10),
        poolItem("Sofa", 10),
        poolItem("Bed", 10),
        // Valuables - 11%
        poolItem("Mirror", 5),
        poolItem("Jewelry Box", 5),
        poolItem("Expressive Painting", 5),
        poolItem("Ugly Painting", 5),
    ]),
    "garden": new Pool([
        // Common Items - 63%
        poolItem("Shovel", 40),
        poolItem("Gloves", 40),
        poolItem("Fertilizer", 40),
        poolItem("Bird House", 40),
        poolItem("Small Wood Log", 40),
        poolItem("Newspapers", 40),
        // Rare Items - 26%
        poolItem("Pepper", 25),
        poolItem("Tomato", 25),
        poolItem("Potato", 25),
        poolItem("Dry Leaves", 25),
        // Valuables - 11%
        poolItem("Bench", 10),
        poolItem("Wood Log", 10),
        poolItem("Scarecrow", 10),
        poolItem("Fuel Canister", 10),
    ]),
    "bank": new Pool([
        // Common Items - 63%
        poolItem("Plant", 40),
        poolItem("Wooden Desk", 40),
        poolItem("Floor Lamp", 40),
        poolItem("Cash Register", 40),
        poolItem("Key", 40),
        poolItem("Poster", 40),
        // Rare Items - 26%
        poolItem("Sofa", 25),
        poolItem("Bench", 25),
        poolItem("Expressive Painting", 25),
        poolItem("Ugly Painting", 25),
        // Valuables - 11%
        poolItem("Jewelry Box", 10),
        poolItem("Gold Bars", 10),
        poolItem("Money Pile", 10),
        poolItem("Crown", 10),
    ]),
    "hall": new Pool([
        poolItem("Small Wood Log", 10),
        poolItem("Wood Log", 5),
        poolItem("Big Wood Log", 2)
    ])
}

function generateLoot(num, level, t) {
    let a = [];
    let p = lootPool[t].pool;
    console.log("for: " + t);
    console.log(p);

    for (var i = 0; i < num; i++) {
        let i = p[Math.floor(Math.random() * p.length)];
        console.log(i)

        a.push(i);
    }
    return a;
}