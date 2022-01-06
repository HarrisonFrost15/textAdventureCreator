"use strict";
class Player {
    constructor(inventory, place, time, alive) {
        this.alive = true;
        this.inventory = {};
        this.place = place;
        this.time = time;
        this.alive = alive;
    }
}
class Item {
    constructor(weight, place, description) {
        this.description = "No further information";
        this.alight = false;
        this.broken = false;
        this.weight = weight;
        this.place = place;
        this.description = description;
    }
}
class Place {
    constructor(description, nearby) {
        this.nearby = {};
        this.items = {};
        this.description = description;
        this.nearby = {};
    }
}
function keyPressed(e) {
    if (e.key == "Enter") {
        execute(userInput.value);
        userInput.value = "";
    }
}
function execute(command) {
}
let userInput = document.getElementById("userInput");
userInput.addEventListener("keypress", keyPressed);
//# sourceMappingURL=script.js.map