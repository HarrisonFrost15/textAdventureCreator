"use strict";
document.getElementById("submitStartingRoom").addEventListener("click", addStartRoom);
document.getElementById("newPlace").addEventListener("click", newPlaceForm);
document.getElementById("newItem").addEventListener("click", newItemForm);
function addStartRoom() {
    let startName = document.getElementById("startLocName").value;
    let startDescription = document.getElementById("startLocDescription").value;
    let startHints = document.getElementById("startHints").value;
    let start = new Place(startName, startDescription, startHints);
    new Player(start, 0, true);
    document.getElementById("startingRoom").style.display = "none";
    document.getElementById("newButtons").style.display = "inline";
}
function newPlaceForm() {
}
function newItemForm() {
}
//# sourceMappingURL=adventureCreator.js.map