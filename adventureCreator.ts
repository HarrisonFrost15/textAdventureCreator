"use strict";



(<HTMLButtonElement>document.getElementById("submitStartingRoom")).addEventListener("click", addStartRoom);
(<HTMLButtonElement>document.getElementById("newPlace")).addEventListener("click", newPlace);
(<HTMLButtonElement>document.getElementById("newItem")).addEventListener("click", newItem);



function addStartRoom(){
    let startName = (<HTMLInputElement>document.getElementById("startLocName")).value
    let startDescription = (<HTMLInputElement>document.getElementById("startLocDescription")).value
    let startHints = (<HTMLInputElement>document.getElementById("startHints")).value

    let start = new Place(startName, startDescription, startHints)
    new Player(start, 0, true, 20, 10);

    (<HTMLDivElement> document.getElementById("startingRoom")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "inline"
}

function newPlace(){
    let placeName = (<HTMLInputElement>document.getElementById("placeName")).value
    let placeDescription = (<HTMLInputElement>document.getElementById("placeDescription")).value
    let placeHints = (<HTMLInputElement>document.getElementById("placeHints")).value
    let placeDirection = (<HTMLInputElement>document.getElementById("placeDirection")).value



}

function newItem(){

}