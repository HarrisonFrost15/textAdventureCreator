"use strict";

let newPlayer : Player

(<HTMLButtonElement>document.getElementById("submitStartingRoom")).addEventListener("click", addStartRoom);
(<HTMLButtonElement>document.getElementById("newPlaceButton")).addEventListener("click", newPlaceForm);
(<HTMLButtonElement>document.getElementById("newItemButton")).addEventListener("click", newItemForm);

(<HTMLButtonElement>document.getElementById("submitPlace")).addEventListener("click", addNewPlace);
(<HTMLButtonElement>document.getElementById("submitItem")).addEventListener("click", addNewItem);




function addStartRoom(){
    let startName = (<HTMLInputElement>document.getElementById("startLocName")).value
    let startDescription = (<HTMLInputElement>document.getElementById("startLocDescription")).value
    let startHints = (<HTMLInputElement>document.getElementById("startHints")).value

    let start = new Place(startName, startDescription, startHints)
    newPlayer = new Player(start, 0, true, 20, 10);

    (<HTMLDivElement> document.getElementById("startingRoom")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "inline"
}

function newPlaceForm(){
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newPlace")).style.display = "inline"
}

function newItemForm(){
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newItem")).style.display = "inline"
}

function addNewPlace(){
    let placeName = (<HTMLInputElement>document.getElementById("placeName")).value
    let placeDescription = (<HTMLInputElement>document.getElementById("placeDescription")).value
    let placeHints = (<HTMLInputElement>document.getElementById("placeHints")).value
    let placeDirection = (<HTMLSelectElement>document.getElementById("placeDirection")).value
    let previousPlace = (<HTMLInputElement>document.getElementById("previousPlace")).value;
    let locked = (<HTMLInputElement>document.getElementById("locked")).value;


    // world.addPlace(new Place (placeName, placeDescription, placeHints), new Exit (locked));
    (<HTMLDivElement> document.getElementById("newPlace")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "inline"
}

function addNewItem(){




    (<HTMLDivElement> document.getElementById("newItem")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "inline"
}