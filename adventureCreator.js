"use strict";
document.getElementById("submitStartingRoom").addEventListener("click", addStartRoom);
document.getElementById("newPlace").addEventListener("click", newPlace);
document.getElementById("newItem").addEventListener("click", newItem);
function addStartRoom() {
    let startName = document.getElementById("startLocName").value;
    let startDescription = document.getElementById("startLocDescription").value;
    let startHints = document.getElementById("startHints").value;
    let start = new Place(startName, startDescription, startHints);
    new Player(start, 0, true, 20, 10);
    document.getElementById("startingRoom").style.display = "none";
    document.getElementById("newButtons").style.display = "inline";
}
function newPlace() {
    let placeName = document.getElementById("placeName").value;
    let placeDescription = document.getElementById("placeDescription").value;
    let placeHints = document.getElementById("placeHints").value;
    let placeDirection = document.getElementById("placeDirection").value;
}
function newItem() {
}
//# sourceMappingURL=adventureCreator.js.map