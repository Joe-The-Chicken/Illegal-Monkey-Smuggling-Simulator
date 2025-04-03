var loc = {
    state: "start",
    zone: "start",
    curTown: 0,
    hasEnteredTown: false
}
var gameStarted = false;
var lastAction = null;

class Option {
    constructor(text, options, results, barter) {
        this.text = text;
        this.options = options;
        this.results = results;
        if (barter) {
            this.barter = barter;
        }
    }
}

var areas = {};

generateTown(10);

reloadAreas()

function reloadAreas() {
    areas = {
        "start": {
            "start": new Option("Welcome to Illegal Monkey Smuggling Simulator!", ["Continue"], [() => move(false, "backstory1")]),
            "backstory1": new Option("Your a dude on a train harboring 726 immortal canadian capuchin monkeys.", ["Continue"], [() => move(false, "backstory2")]),
            "backstory2": new Option("These monkeys aren't allowed in the US, but you need to transport them to your buyers in Mexico!", ["Continue"], [() => move(false, "tutorial1")]),
            "tutorial1": new Option("You have 3 things you need to keep track of. Hunger, Thirst, and Fuel.", ["Continue"], [() => move(false, "tutorial2")]),
            "tutorial2": new Option("Hunger and Thirst can be replenished with food and drinks bought at rest stops.", ["Continue"], [() => move(false, "tutorial3")]),
            "tutorial3": new Option("Fuel is replenished with loot you find in houses.", ["Continue"], [() => move(false, "tutorial4")]),
            "tutorial4": new Option("Your goal is to make it to Mexico alive with your monkeys before your fuel runs out. Simple.", ["Continue"], [() => move(false, "beginJourney")]),
            "beginJourney": new Option("Are you ready to begin your Journey?", ["Yes"], [() => move(false, "montana", "mountainTrackEnter")])
        },
        "montana": {
            // Basic
            "mountainTrackEnter": new Option("Your train enters the US in Montana.", ["Go Forward"], [() => move(true, "mountainTrack")]),
            "mountainTrack": new Option("You travel for five miles. Nothing of interest is in sight.", ["Keep Going", "Stop Here"], [() => resultMountainTrack(), () => move(false, "viewMountains")]),
            "viewMountains": new Option("I told you. Nothing here is important.", ["Go Forward"], [() => resultMountainTrack()]),

            // Random Events
            "itemFall": new Option("Your train made a sharp turn causing some of your items to fall out.", ["Go Forward"], [() => resultMountainTrack()]),
            "banditSucceed": new Option("You got the sequence correct! You successfully defended against the bandits.", ["Go Forward"], [() => resultMountainTrack()]),
            "banditRobHigh": new Option("Your train was robbed! All valuables have been taken. You were defenseless because you were drunk.", ["Go Forward"], [() => resultMountainTrack()]),
            "banditRob": new Option("Your train was robbed! All valuables have been taken.", ["Go Forward"], [() => resultMountainTrack()]),

            // Bandit
            "robTutorial": new Option("You're being robbed by bandits! Beat the matching game in under 8 guesses to escape!\nYou need to use the numbers 1-4 to guess the random combination.", ["Okay"], [() => beginRobberMinigame()]),
            "rob0": new Option("You got 0 correct", ["Try Again"], [() => guessPattern()]),
            "rob1": new Option("You got 1 correct", ["Try Again"], [() => guessPattern()]),
            "rob2": new Option("You got 2 correct", ["Try Again"], [() => guessPattern()]),
            "rob3": new Option("You got 3 correct", ["Try Again"], [() => guessPattern()]),

            // Rest Stop
            "restStopTrack": new Option("You travel for five miles. You're approaching a rest stop.", ["Keep Going", "Stop Here"], [() => resultMountainTrack(), () => move(false, "restStop")]),
            "restStop": new Option("You're at the rest stop.", ["Buy Food", "Buy Drink", "Buy Fuel", "Talk to Cashier", "Leave"], [() => move(false, "buyFood"), () => move(false, "buyDrink"), () => move(false, "buyFuel"), () => move(false, "talkToCashier"), () => resultMountainTrack()]),

            "talkToCashier": new Option("You walk up to the cashier.", ["Ask to trade", "Ask about the Moose Blood", "Nevermind, I have social anxiety"], [() => move(false, "tradeCashier"), () => move(false, "cashierTalk1"), () => move(false, "restStop")]),
            "cashierTalk1": new Option("CASHIER: Oh, yeah... When you mix the blood with 17 pings of sugar it becomes highly addictive. ", ["(Continue)"], [() => move(false, "cashierTalk2")]),
            "cashierTalk2": new Option("CASHIER: So you're not actually getting less thirsty. You're brain is just high on sugary blood and forgets that it's thirsty for a while.", ["Yeah that makes complete sense", "How is that much sugar healthy?"], [() => move(false, "restStop"), () => move(false, "cashierTalk3")]),
            "cashierTalk3": new Option("CASHIER: It isn't.", ["..."], [() => move(false, "restStop")]),
            "tradeCashier": new Option("CASHIER wants to trade!", ["Done"], [() => move(false, "restStop")], true),

            "buyFood": new Option("You look at the menu.", ["Buy Mountain Burger (Replenish 20 Hunger)", "Buy Bigger Mountain Burger (Replenish 40 Hunger)", "Nevermind"], [() => move(false, "food1"), () => move(false, "food2"), () => move(false, "restStop")]),
            "food1": new Option("Purchase Mountain Burger?", ["Yes - $15", "Nevermind"], [() => purchase("Mountain Burger", "restStop"), () => move(false, "restStop")]),
            "food2": new Option("Purchase Bigger Mountain Burger?", ["Yes - $30", "Nevermind"], [() => purchase("Bigger Mountain Burger", "restStop"), () => move(false, "restStop")]),

            "buyDrink": new Option("You look at the menu.", ["Buy Water (Replenish 30 Thirst)", "Buy Moose Blood (Replenish 120 Thirst)", "Nevermind"], [() => move(false, "drink1"), () => move(false, "drink2"), () => move(false, "restStop")]),
            "drink1": new Option("Purchase Water?", ["Yes - $15", "Nevermind"], [() => purchase("Water", "restStop"), () => move(false, "restStop")]),
            "drink2": new Option("Purchase Moose Blood?", ["Yes - $60", "Nevermind"], [() => purchase("Moose Blood", "restStop"), () => move(false, "restStop")]),

            "buyFuel": new Option("Purchase Fuel Canister (Replenishes 15-25 Fuel)?", ["Yes - $9", "Nevermind"], [() => purchase("Fuel Canister", "restStop"), () => move(false, "restStop")]),

            // Town Raid
            "townTrack": new Option("You travel for five miles. You're approaching a town.", ["Keep Going", "Stop Here"], [() => resultMountainTrack(), () => move(false, "town")]),
            "town": new Option("You're in the town. Where do you go?", Object.keys(townData[loc.curTown].houses), townData[loc.curTown].houseInteract),

            "townHall": new Option("You enter the town hall.", ["Raid", "Leave"], [() => raidBuilding("Town Hall"), () => move(false, "town")]),
            "house1": new Option("You enter the building.", ["Raid", "Leave"], [() => raidBuilding("Building 1"), () => move(false, "town")]),
            "house2": new Option("You enter the building.", ["Raid", "Leave"], [() => raidBuilding("Building 2"), () => move(false, "town")]),
            "house3": new Option("You enter the building.", ["Raid", "Leave"], [() => raidBuilding("Building 3"), () => move(false, "town")]),
            "house4": new Option("You enter the building.", ["Raid", "Leave"], [() => raidBuilding("Building 4"), () => move(false, "town")]),
            "house5": new Option("You enter the building.", ["Raid", "Leave"], [() => raidBuilding("Building 5"), () => move(false, "town")]),

            "tradingPost": new Option("You enter the trading post. An employee is waiting patiently for you to do something.", ["Sell Items", "Leave"], [() => move(false, "tradeEmployee"), () => move(false, "town")]),
            "tradeEmployee": new Option("EMPLOYEE wants to trade!", ["Done"], [() => move(false, "tradingPost")], true),

            // Casino
            "casinoTrack": new Option("You travel for five miles. You're approaching a casino.", ["Keep Going", "Stop Here"], [() => resultMountainTrack(), () => move(false, "casino")]),
            "casino": new Option("You're in the casino. Where do you go?", ["Roulette Table", "Blackjack", "Leave"], [() => move(false, "roulette"), () => move(false, "blackjack"), () => resultMountainTrack()]),

            "roulette": new Option("ROULETTE wants to play a game!", ["Done"], [() => move(false, "casino")]),
            "blackjack": new Option("BLACKJACK wants to play a game!", ["Done"], [() => move(false, "casino")]),
            "casinoDealer": new Option("DEALER wants to trade!", ["Done"], [() => move(false, "casino")], true),

            // Bar
            "barTrack": new Option("You travel for five miles. You're approaching a bar.", ["Keep Going", "Stop Here"], [() => resultMountainTrack(), () => move(false, "bar")]),
            "bar": new Option("You're in the bar.", ["Order Food", "Order Drink", "Trade with Bartender", "Leave"], [() => move(false, "barFood"), () => move(false, "barDrink"), () => move(false, "barCashier"), () => resultMountainTrack()]),

            "barDrink": new Option("You look at the drink menu", ["Buy Water (Replenish 30 Thirst)", "Buy Suspicious Soda (Replenish 50 Thirst)", "Nevermind"], [() => move(false, "barDrink1"), () => move(false, "barDrink2"), () => move(false, "bar")]),
            "barDrink1": new Option("Purchase Water?", ["Yes - $15", "Nevermind"], [() => purchase("Water", "bar"), () => move(false, "bar")]),
            "barDrink2": new Option("Purchase Suspicious Soda?", ["Yes - $15", "Nevermind"], [() => purchase("Suspicious Soda", "bar"), () => move(false, "bar")]),

            "barFood": new Option("You look at the food menu", ["Buy Mountain Burger (Replenish 20 Hunger)", "Buy Bigger Mountain Burger (Replenish 40 Hunger)", "Nevermind"], [() => move(false, "barFood1"), () => move(false, "barFood2"), () => move(false, "bar")]),
            "barFood1": new Option("Purchase Mountain Burger?", ["Yes - $15", "Nevermind"], [() => purchase("Mountain Burger", "bar"), () => move(false, "bar")]),
            "barFood2": new Option("Purchase Bigger Mountain Burger?", ["Yes - $30", "Nevermind"], [() => purchase("Bigger Mountain Burger", "bar"), () => move(false, "bar")]),

            "barCashier": new Option("BARTENDER wants to trade!", ["Done"], [() => move(false, "bar")], true),

            // End
            "approachDakota": new Option("You're about to enter South Dakota.", ["Enter the Dakotas"], [() => move("dakota, fieldTrackStart")])
        },
        "dakota": {

        },
        "nebraska": {

        },
        "oklahoma": {

        },
        "texas": {

        },
        "gameEnd": {
            "fuelRunOut": new Option("Your fuel ran out. A group of angry sky people picked you up and brang you back to Canada. \nYou lost.", ["Try Again"], [() => location.reload()]),
            "famine": new Option("You ran out of food. You started eating your toes and died. \nYou lost.", ["Try Again"], [() => location.reload()]),
            "dehydration": new Option("You ran out of water. A group of angry sky people picked you up and brang you back to Canada. You lost.", ["Try Again"], [() => location.reload()])
        }
    }

}