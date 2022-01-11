"use strict";



(<HTMLButtonElement>document.getElementById("submitStartingRoom")).addEventListener("click", addStartRoom);
(<HTMLButtonElement>document.getElementById("newPlace")).addEventListener("click", newPlaceForm);
(<HTMLButtonElement>document.getElementById("newItem")).addEventListener("click", newItemForm);



function addStartRoom(){
    let startName = (<HTMLInputElement>document.getElementById("startLocName")).value
    let startDescription = (<HTMLInputElement>document.getElementById("startLocDescription")).value
    let startHints = (<HTMLInputElement>document.getElementById("startHints")).value

    let start = new Place(startName, startDescription, startHints)
    new Player(start,0,true);

    (<HTMLDivElement> document.getElementById("startingRoom")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "inline"
}

function newPlaceForm(){
    // let placeName = (<HTMLInputElement>document.getElementById())
}

function newItemForm(){

}