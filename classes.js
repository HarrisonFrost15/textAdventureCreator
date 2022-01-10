"use strict";
// Sets the player class, including all of the properties related to the player, for example where they are
class Player {
    constructor(place, time, alive) {
        this.alive = true;
        this.inventory = {};
        this.place = place;
        this.time = time;
        this.alive = alive;
    }
}
// Creates a class that controls all of the properties for items, eg their weights and descriptions
class Item {
    // Constructor for new items.
    constructor(itemName, weight, place, description, examination, movable) {
        this.itemName = itemName;
        this.weight = weight;
        this.place = place;
        // itemName: string
        // weight: number
        // place: Place
        this.description = "No further information";
        this.alight = false;
        this.broken = false;
        this.locked = false;
        this.weight = weight;
        this.place = place;
        this.description = description;
        this.examination = examination;
        this.movable = movable;
    }
}
// Creates a class for places including properties such as including other nearby places, what items are in this location
class Place {
    constructor(name, description, hints) {
        this.nearby = {};
        this.items = {};
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
        `;
    }
    // Links a new place to the current one and also creates a reverse link so you can go back to the previous place
    addPlace(direction, place) {
        this.nearby[direction] = place;
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
        return place; // return a reference to the place we just added (so we can chain adds)
    }
    addItem(name, item) {
        this.items[name] = item;
    }
}
//# sourceMappingURL=classes.js.map