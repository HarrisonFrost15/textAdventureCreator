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
// Defines items that exist in the world, these can be obstacles or items the player can pick up.
// class Item {
//     // itemName: string
//     // weight: number
//     // place: Place
//     description: string = "No further information"
//     examination:string;
//     alight: boolean = false
//     broken: boolean = false
//     locked:boolean = false
//     collectable:boolean
//     open:boolean = false
//     hidden:boolean = true
//     contents: Record <string, Item> = {}
//     pushable: boolean = false
//     edible : boolean = false
//     drinkable : boolean = false
//     poisonous: boolean = false
//     breakable: boolean 
//     attackable: boolean
//     flammable: boolean
//     // Constructor for new items.
//     constructor(public itemName:string, public weight:number, public place:Place, description:string, examination:string, collectable:boolean, breakable:boolean, attackable:boolean, flammable:boolean) { 
//         this.itemName = itemName
//         this.weight = weight
//         this.place = place
//         this.description = description
//         this.examination = examination
//         this.collectable = collectable
//         this.breakable = breakable
//         this.attackable = attackable
//         this.flammable = flammable
//     }
//     // Methods related to items
// }
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
    constructor(locked) {
        this.locked = locked;
    }
}
// Defines items that exist in the world, these can be obstacles or items the player can pick up.
class Item {
    itemID;
    itemName;
    description;
    weight;
    // parentContainer: object
    contents = {};
    alight = false;
    broken = false;
    locked = false;
    collectable = false;
    open = false;
    hidden = true;
    pushable = false;
    edible = false;
    drinkable = false;
    poisonous = false;
    breakable = true;
    throwable = true;
    flammable = true;
    // Constructor for new items.
    constructor(itemID, itemName, weight, /*parentContainer:object,*/ description) {
        this.itemID = itemID;
        this.description = description;
        this.itemName = itemName;
        this.weight = weight;
        // this.parentContainer = parentContainer
    }
    // Methods related to items
    addItem(name, item) {
        this.contents[name] = item;
    }
}
//# sourceMappingURL=classes.js.map