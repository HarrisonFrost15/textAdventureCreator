"use strict";
let newPlayer;
document.getElementById("submitStartingRoom").addEventListener("click", addStartRoom);
document.getElementById("newPlaceButton").addEventListener("click", newPlaceForm);
document.getElementById("newItemButton").addEventListener("click", newItemForm);
document.getElementById("submitPlace").addEventListener("click", addNewPlace);
document.getElementById("submitItem").addEventListener("click", addNewItem);
function addStartRoom() {
    let startName = document.getElementById("startLocName").value;
    let startDescription = document.getElementById("startLocDescription").value;
    let startHints = document.getElementById("startHints").value;
    let start = new Place(startName, startDescription, startHints);
    newPlayer = new Player(start, 0, true, 20, 10);
    document.getElementById("startingRoom").style.display = "none";
    document.getElementById("newButtons").style.display = "inline";
}
function newPlaceForm() {
    document.getElementById("newButtons").style.display = "none";
    document.getElementById("newPlace").style.display = "inline";
}
function newItemForm() {
    document.getElementById("newButtons").style.display = "none";
    document.getElementById("newItem").style.display = "inline";
}
function addNewPlace() {
    let placeName = document.getElementById("placeName").value;
    let placeDescription = document.getElementById("placeDescription").value;
    let placeHints = document.getElementById("placeHints").value;
    let placeDirection = document.getElementById("placeDirection").value;
    let previousPlace = document.getElementById("previousPlace").value;
    let locked = document.getElementById("locked").value;
    // world.addPlace(new Place (placeName, placeDescription, placeHints), new Exit (locked));
    document.getElementById("newPlace").style.display = "none";
    document.getElementById("newButtons").style.display = "inline";
}
function addNewItem() {
    document.getElementById("newItem").style.display = "none";
    document.getElementById("newButtons").style.display = "inline";
}
//# sourceMappingURL=adventureCreator.js.map