class Food {
    constructor(value, food, description) {
        this.type = "food";
        this.value = value;
        this.food = food;
        this.description = `${description}\n - Worth $${value}\n - Replenishes ${food} Hunger`;
    }
}

class Drink {
    constructor(value, thirsty, description) {
        this.type = "drink";
        this.value = value;
        this.thirsty = thirsty;
        this.description = `${description}\n - Worth $${value}\n - Replenishes ${thirsty} Thirst`;
    }
}

class Fuel {
    constructor(value, fuel, description) {
        this.type = "fuel";
        this.value = value;
        this.fuel = fuel;
        if (typeof fuel == "object") {
            this.description = `${description}\n - Worth $${value}\n - Replenishes ${fuel[0]} - ${fuel[0] + fuel[1] - 1} Fuel`;
        } else {
            this.description = `${description}\n - Worth $${value}\n - Replenishes ${fuel} Fuel`;
        }
    }
}

class Valuable {
    constructor(value, description) {
        this.type = "valuable";
        this.value = value;
        this.description = `${description}\n - Worth $${value}`;
    }
}

class Scrap {
    constructor(value, description) {
        this.type = "scrap";
        this.value = value;
        this.description = `${description}\n - Worth $${value}`;
    }
}

let itemList = {
    "Mountain Burger": new Food(10, 20, "A low-quality burger that somehow contains nutrients."),
    "Bigger Mountain Burger": new Food(18, 40, "A still low-quality burger that somehow contains double the nutrients of the normal Mountain Burger."),
    "Small Wood Log": new Fuel(2, 5, "A very efficient fuel source."),
    "Wood Log": new Fuel(4, 10, "A very efficient fuel source."),
    "Big Wood Log": new Fuel(6, 15, "A very efficient fuel source."),
    "MASSIVE Wood Log": new Fuel(8, 20, "A very efficient fuel source."),
    "Fuel Canister": new Fuel(6, [15, 11], "A desperate source for a desperate man."),
    "Water": new Drink(10, 30, "Water with a hint of metal."),
    "Moose Blood": new Drink(40, 120, "Apparently this stuff has magical healing properties or smth idk."),
    "Wood Chair": new Fuel(8, 16, "Very nice chair 10/10."),
    "Wood Table": new Fuel(12, 24, "Very bad table 1/10."),
    "Wood Spoon": new Fuel(2, 4, "Imagine getting a splinter from this."),
    "Newspapers": new Fuel(3, 3, "Breaking news: You suck."),
    "Sofa": new Fuel(15, 18, "There's a faint pee stain on the cushion."),
    "Bed": new Fuel(12, 15, "Inside the bed is a dead raccoon."),
    "Mirror": new Valuable(15, "Who's this ugly mf looking at?"),
    "Expressive Painting": new Valuable(20, "This painting makes you feel angry. Like you want to punish the people who didn't let you into art school."),
    "Ugly Painting": new Valuable(25, "Modern art these days fr."),
    "Jewelry Box": new Valuable(40, "I mean it's cool I guess"),
    "Fingernail Clippings": new Scrap(2, "For what purpose must you save your fermented fingernail clippings?"),
    "Cockroach": new Scrap(1, "Why did you pick this up?"),
    "Finger": new Scrap(3, "what."),
    "Shovel": new Scrap(5, "scoop!"),
    "Gloves": new Scrap(2, "They didn't fit."),
    "Fertilizer": new Scrap(3, "Not sure if thats fertilizer or someone disguising a dead body."),
    "Bird House": new Scrap(4, "Probably would sell well on facebook marketplace, but that doesn't really exist anymore, does it?."),
    "Tomato": new Food(0, -2, "It's rotten."),
    "Pepper": new Food(0, -2, "It's rotten."),
    "Potato": new Food(0, -2, "It's rotten."),
    "Dry Leaves": new Fuel(1, 4, "There's a happy little caterpillar named Phil in one of them. He's dead."),
    "Scarecrow": new Fuel(7, 11, "There's a small bird nest on it's head."),
    "Bench": new Fuel(8, 14, "It's missing a leg.")
};