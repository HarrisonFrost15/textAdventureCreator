"use strict";
let gameWorld;
let itemID = 1;
document.getElementById("submitInitialGeneration").addEventListener("click", initialWorldGen);
document.getElementById("newPlaceButton").addEventListener("click", newPlaceForm);
document.getElementById("submitPlace").addEventListener("click", addNewPlace);
document.getElementById("newItemButton").addEventListener("click", newItemForm);
document.getElementById("submitItem").addEventListener("click", addNewItem);
document.getElementById("generateJSONButton").addEventListener("click", outputJSON);
function initialWorldGen() {
    let worldName = document.getElementById("worldName").value;
    let introText = document.getElementById("introText").value;
    let playerHealth = parseInt(document.getElementById("playerHealth").value);
    let playerStamina = parseInt(document.getElementById("playerStamina").value);
    let startName = document.getElementById("startLocName").value;
    let startDescription = document.getElementById("startLocDescription").value;
    let startHints = document.getElementById("startHints").value;
    let startPlace = new Place(startName, startDescription, startHints);
    gameWorld = new World(worldName, new Player(startPlace, playerHealth, playerStamina), introText);
    gameWorld.addPlace(startName.toLowerCase(), startPlace);
    let nameList = document.getElementById("placeList");
    let listItem = document.createElement("li");
    listItem.innerHTML = startName;
    nameList.appendChild(listItem);
    document.getElementById("initialGeneration").style.display = "none";
    document.getElementById("newButtons").style.display = "inline";
}
function newPlaceForm() {
    document.getElementById("newButtons").style.display = "none";
    document.getElementById("newPlace").style.display = "inline";
}
function addNewPlace() {
    let placeName = document.getElementById("placeName").value;
    let placeDescription = document.getElementById("placeDescription").value;
    let placeHints = document.getElementById("placeHints").value;
    gameWorld.addPlace(placeName.toLowerCase(), new Place(placeName, placeDescription, placeHints));
    const directions = ["north", "east", "south", "west", "up", "down"];
    for (let i in directions) {
        if (document.getElementById(directions[i]).checked == true) {
            let placeDirection = directions[i];
            let place = (document.getElementById(`${directions[i]}Place`).value).toLowerCase();
            let locked = document.getElementById("locked").checked;
            gameWorld.places[placeName.toLowerCase()].addNearbyPlace(placeDirection, gameWorld.places[place], new Exit(locked));
        }
    }
    let nameList = document.getElementById("placeList");
    let listItem = document.createElement("li");
    listItem.innerHTML = placeName;
    nameList.appendChild(listItem);
    document.getElementById("newPlace").style.display = "none";
    document.getElementById("newButtons").style.display = "inline";
}
function newItemForm() {
    document.getElementById("newButtons").style.display = "none";
    document.getElementById("newItem").style.display = "inline";
}
function addNewItem() {
    let itemName = document.getElementById("itemName").value;
    let itemDescription = document.getElementById("itemDescription").value;
    let itemWeight = parseInt(document.getElementById("itemWeight").value);
    let parentContainerType = document.getElementById("parentContainerType").value;
    let parentContainerName = document.getElementById("parentContainerName").value;
    let generatedItem = new Item(itemID, itemName, itemWeight, itemDescription);
    let itemList = document.getElementById("itemList");
    let listItem = document.createElement("li");
    listItem.innerHTML = `${itemName} (${itemID})`;
    itemList.appendChild(listItem);
    gameWorld.addItem(itemID, generatedItem);
    if (parentContainerType == "place") {
        gameWorld.places[parentContainerName.toLowerCase()].addItem(itemName.toLowerCase(), generatedItem);
    }
    else if (parentContainerType == "item") {
        gameWorld.items[parseInt(parentContainerName)].addItem(itemName.toLowerCase(), generatedItem);
    }
    if (document.getElementById("collectible").checked == true) {
        gameWorld.items[itemID].collectable = true;
    }
    if (document.getElementById("edible").checked == true) {
        gameWorld.items[itemID].edible = true;
    }
    if (document.getElementById("drinkable").checked == true) {
        gameWorld.items[itemID].drinkable = true;
    }
    if (document.getElementById("poisonous").checked == true) {
        gameWorld.items[itemID].poisonous = true;
    }
    if (document.getElementById("flammable").checked == true) {
        gameWorld.items[itemID].flammable = true;
    }
    if (document.getElementById("alight").checked == true) {
        gameWorld.items[itemID].alight = true;
    }
    if (document.getElementById("locked").checked == true) {
        gameWorld.items[itemID].locked = true;
    }
    if (document.getElementById("open").checked == true) {
        gameWorld.items[itemID].open = true;
    }
    if (document.getElementById("hidden").checked == true) {
        gameWorld.items[itemID].hidden = true;
    }
    if (document.getElementById("pushable").checked == true) {
        gameWorld.items[itemID].pushable = true;
    }
    if (document.getElementById("throwable").checked == true) {
        gameWorld.items[itemID].throwable = true;
    }
    if (document.getElementById("breakable").checked == true) {
        gameWorld.items[itemID].breakable = true;
    }
    if (document.getElementById("broken").checked == true) {
        gameWorld.items[itemID].broken = true;
    }
    itemID += 1;
    document.getElementById("newItem").style.display = "none";
    document.getElementById("newButtons").style.display = "inline";
}
function outputJSON() {
    let jsonOutput = JSON.stringify(JSON.decycle(gameWorld));
    let outputArea = document.getElementById("outputField");
    outputArea.innerHTML = jsonOutput;
}
//# sourceMappingURL=adventureCreator.js.map