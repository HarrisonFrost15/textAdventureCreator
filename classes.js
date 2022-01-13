"use strict";
// Game world class that will be used to store the player and all locations, so that it can be saved and provide easy reference to each location.
class World {
    worldName;
    player;
    places = {};
    items = {};
    startText;
    constructor(worldName, player, startText) {
        this.worldName = worldName;
        this.player = player;
        this.startText = startText;
    }
    addPlace(name, place) {
        this.places[name] = place;
    }
    addItem(id, item) {
        this.items[id] = item;
    }
}
// Sets the player class, including all of the properties related to the player, for example where they are
class Player {
    inventory;
    place;
    time = 0;
    alive = true;
    health = 20;
    stamina = 10;
    carryingWeight = 0;
    constructor(place, health, stamina) {
        this.inventory = {};
        this.place = place;
        this.health = health;
        this.stamina = stamina;
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
    // // When called, returns the description, nearby items and nearby places to be shown on screen
    // fullDescription():string{
    //     return `
    //     ${gameWorld.player.place.description}<br>
    //     You see: ${listProperties(gameWorld.player.place.items)}<br>
    //     You can go: ${listProperties(gameWorld.player.place.nearby)}<br>
    //     Inventory: ${listProperties(gameWorld.player.inventory)}<br>
    //     `
    // }
    // Links a new place to the current one and also creates a reverse link so you can go back to the previous place
    addNearbyPlace(direction, place, exit) {
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
    }
    addItem(name, item) {
        this.items[name] = item;
    }
}
class Exit {
    locked;
    blocked;
    needsJump;
    // hidden : boolean
    // durability : number
    constructor(locked, blocked, needsJump) {
        this.locked = locked;
        this.blocked = blocked;
        this.needsJump = needsJump;
    }
}
// Defines items that exist in the world, these can be obstacles or items the player can pick up.
class Item {
    itemID;
    itemName;
    description;
    weight;
    contents = {};
    alight = false;
    broken = false;
    locked = false;
    collectable = false;
    open = false;
    hidden = false;
    pushable = false;
    edible = false;
    drinkable = false;
    poisonous = false;
    breakable = false;
    attackable = false;
    flammable = false;
    durability = 2;
    weapon = false;
    // Constructor for new items.
    constructor(itemID, itemName, weight, description) {
        this.itemID = itemID;
        this.description = description;
        this.itemName = itemName;
        this.weight = weight;
    }
    // Methods related to items
    addItem(name, item) {
        this.contents[name] = item;
    }
}
//# sourceMappingURL=classes.js.map