"use strict";
let newGame;
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
    newGame = new World(worldName, new Player(startPlace, playerHealth, playerStamina), introText);
    newGame.addPlace(startName.toLowerCase(), startPlace);
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
    newGame.addPlace(placeName.toLowerCase(), new Place(placeName, placeDescription, placeHints));
    const directions = ["north", "east", "south", "west", "up", "down"];
    for (let i in directions) {
        if (document.getElementById(directions[i]).checked == true) {
            let placeDirection = directions[i];
            let place = (document.getElementById(`${directions[i]}Place`).value).toLowerCase();
            let locked = document.getElementById("locked").checked;
            newGame.places[placeName.toLowerCase()].addNearbyPlace(placeDirection, newGame.places[place], new Exit(locked));
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
    newGame.addItem(itemID, generatedItem);
    if (parentContainerType == "place") {
        newGame.places[parentContainerName.toLowerCase()].addItem(itemName.toLowerCase(), generatedItem);
    }
    else if (parentContainerType == "item") {
        newGame.items[parseInt(parentContainerName)].addItem(itemName.toLowerCase(), generatedItem);
    }
    if (document.getElementById("collectible").checked == true) {
        newGame.items[itemID].collectable = true;
    }
    if (document.getElementById("edible").checked == true) {
        newGame.items[itemID].edible = true;
    }
    if (document.getElementById("drinkable").checked == true) {
        newGame.items[itemID].drinkable = true;
    }
    if (document.getElementById("poisonous").checked == true) {
        newGame.items[itemID].poisonous = true;
    }
    if (document.getElementById("flammable").checked == true) {
        newGame.items[itemID].flammable = true;
    }
    if (document.getElementById("alight").checked == true) {
        newGame.items[itemID].alight = true;
    }
    if (document.getElementById("locked").checked == true) {
        newGame.items[itemID].locked = true;
    }
    if (document.getElementById("open").checked == true) {
        newGame.items[itemID].open = true;
    }
    if (document.getElementById("hidden").checked == true) {
        newGame.items[itemID].hidden = true;
    }
    if (document.getElementById("pushable").checked == true) {
        newGame.items[itemID].pushable = true;
    }
    // if ((<HTMLInputElement>document.getElementById("throwable")).checked == true){
    //     newGame.items[itemID].throwable = true
    // }
    if (document.getElementById("breakable").checked == true) {
        newGame.items[itemID].breakable = true;
    }
    if (document.getElementById("broken").checked == true) {
        newGame.items[itemID].broken = true;
    }
    itemID += 1;
    document.getElementById("newItem").style.display = "none";
    document.getElementById("newButtons").style.display = "inline";
}
function outputJSON() {
    let jsonOutput = JSON.stringify(JSON.decycle(newGame));
    let outputArea = document.getElementById("outputField");
    outputArea.innerHTML = jsonOutput;
}
//# sourceMappingURL=adventureCreator.js.map