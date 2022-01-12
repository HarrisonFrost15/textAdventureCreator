"use strict";
// Sets the player class, including all of the properties related to the player, for example where they are
class Player {
    inventory;
    place;
    time;
    alive = true;
    health = 20;
    stamina = 10;
    carryingWeight = 0;
    constructor(place, time, alive, health, stamina) {
        this.inventory = {};
        this.place = place;
        this.time = time;
        this.alive = alive;
        this.health = health;
        this.stamina = stamina;
    }
}
// Defines items that exist in the world, these can be obstacles or items the player can pick up.
class Item {
    itemName;
    weight;
    place;
    // itemName: string
    // weight: number
    // place: Place
    description = "No further information";
    examination;
    alight = false;
    broken = false;
    locked = false;
    collectable;
    open = false;
    hidden = true;
    contents = {};
    pushable = false;
    edible = false;
    drinkable = false;
    poisonous = false;
    breakable = false;
    throwable;
    flammable;
    // Constructor for new items.
    constructor(itemName, weight, place, description, examination, collectable, breakable, throwable, flammable, broken) {
        this.itemName = itemName;
        this.weight = weight;
        this.place = place;
        this.itemName = itemName;
        this.weight = weight;
        this.place = place;
        this.description = description;
        this.examination = examination;
        this.collectable = collectable;
        this.breakable = breakable;
        this.throwable = throwable;
        this.flammable = flammable;
        this.broken = broken;
    }
}
// Creates a class for places including properties such as including other nearby places, what items are in this location
class Place {
    name;
    description = "No further information";
    nearby = {};
    items = {};
    exits = {};
    hints;
    constructor(name, description, hints) {
        this.name = name;
        this.description = description;
        this.nearby = {};
        this.hints = hints;
    }
    // When called, returns the description, nearby items and nearby places to be shown on screen
    fullDescription() {
        return `
        ${player.place.description}<br>
        You see: ${listProperties(player.place.items)}<br>
        You can go: ${listProperties(player.place.nearby)}<br>
        Inventory: ${listProperties(player.inventory)}<br>
        `;
    }
    //     // Links a new place to the current one and also creates a reverse link so you can go back to the previous place
    addPlace(direction, place, exit) {
        this.nearby[direction] = place;
        this.exits[direction] = exit;
        let previousDirection = "";
        if (direction == "north") {
            previousDirection = "south";
        }
        else if (direction == "south") {
            previousDirection = "north";
        }
        else if (direction == "east") {
            previousDirection = "west";
        }
        else if (direction == "west") {
            previousDirection = "east";
        }
        else if (direction == "up") {
            previousDirection = "down";
        }
        else if (direction == "down") {
            previousDirection = "up";
        }
        place.nearby[previousDirection] = this;
        place.exits[previousDirection] = exit;
        return place; // return a reference to the place we just added (so we can chain adds)
    }
    addItem(name, item) {
        this.items[name] = item;
    }
}
class Exit {
    locked;
    constructor(locked) {
        this.locked = locked;
    }
}
//# sourceMappingURL=classes.js.map