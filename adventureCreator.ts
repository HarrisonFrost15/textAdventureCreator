"use strict";

let newGame: World
let itemID: number = 1;

(<HTMLButtonElement>document.getElementById("submitInitialGeneration")).addEventListener("click", initialWorldGen);
(<HTMLButtonElement>document.getElementById("newPlaceButton")).addEventListener("click", newPlaceForm);
(<HTMLButtonElement>document.getElementById("submitPlace")).addEventListener("click", addNewPlace);
(<HTMLButtonElement>document.getElementById("newItemButton")).addEventListener("click", newItemForm);
(<HTMLButtonElement>document.getElementById("submitItem")).addEventListener("click", addNewItem);
(<HTMLButtonElement>document.getElementById("generateJSONButton")).addEventListener("click", outputJSON);

function initialWorldGen(){
    let worldName = (<HTMLInputElement>document.getElementById("worldName")).value
    let introText = (<HTMLTextAreaElement>document.getElementById("introText")).value
    let playerHealth:number = parseInt((<HTMLInputElement>document.getElementById("playerHealth")).value)
    let playerStamina:number = parseInt((<HTMLInputElement>document.getElementById("playerStamina")).value)
    let startName = (<HTMLInputElement>document.getElementById("startLocName")).value
    let startDescription = (<HTMLInputElement>document.getElementById("startLocDescription")).value
    let startHints = (<HTMLInputElement>document.getElementById("startHints")).value

    let startPlace = new Place(startName, startDescription, startHints);

    newGame = new World(
        worldName,
        new Player(
            startPlace,
            playerHealth,
            playerStamina
        ),
        introText
    );

    newGame.addPlace(startName.toLowerCase(), startPlace);

    let nameList = <HTMLUListElement>document.getElementById("placeList")
    let listItem = document.createElement("li")
    listItem.innerHTML = startName
    nameList.appendChild(listItem);

    (<HTMLDivElement> document.getElementById("initialGeneration")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "inline"
}

function newPlaceForm(){
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newPlace")).style.display = "inline"
}

function addNewPlace(){
    let placeName = (<HTMLInputElement>document.getElementById("placeName")).value
    let placeDescription = (<HTMLInputElement>document.getElementById("placeDescription")).value
    let placeHints = (<HTMLInputElement>document.getElementById("placeHints")).value

    newGame.addPlace(
        placeName.toLowerCase(),
        new Place(
            placeName,
            placeDescription,
            placeHints
        )
    );

    const directions = ["north", "east", "south", "west", "up", "down"]
    for(let i in directions){
        if ((<HTMLInputElement> document.getElementById(directions[i])).checked == true){
            let placeDirection = directions[i]
            let place = ((<HTMLInputElement>document.getElementById(`${directions[i]}Place`)).value).toLowerCase();
            let locked = (<HTMLInputElement>document.getElementById("locked")).checked;

            newGame.places[placeName.toLowerCase()].addNearbyPlace(
                placeDirection,
                newGame.places[place],
                new Exit(locked));
        }
    }

    let nameList = <HTMLUListElement>document.getElementById("placeList")
    let listItem = document.createElement("li")
    listItem.innerHTML = placeName
    nameList.appendChild(listItem);

    (<HTMLDivElement> document.getElementById("newPlace")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "inline"
}


function newItemForm(){
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newItem")).style.display = "inline"
}

function addNewItem(){

    let itemName = (<HTMLInputElement>document.getElementById("itemName")).value
    let itemDescription = (<HTMLInputElement>document.getElementById("itemDescription")).value
    let itemWeight = parseInt((<HTMLInputElement>document.getElementById("itemWeight")).value)
    let parentContainerType = (<HTMLSelectElement>document.getElementById("parentContainerType")).value
    let parentContainerName = (<HTMLInputElement>document.getElementById("parentContainerName")).value

    let generatedItem = new Item(
        itemID,
        itemName,
        itemWeight,
        itemDescription
    )

    let itemList = <HTMLUListElement>document.getElementById("itemList")
    let listItem = document.createElement("li")
    listItem.innerHTML = `${itemName} (${itemID})`
    itemList.appendChild(listItem);

    newGame.addItem(itemID, generatedItem)


    if (parentContainerType == "place"){
        newGame.places[parentContainerName.toLowerCase()].addItem(
            itemName.toLowerCase(),
            generatedItem
        )
    }
    
    else if (parentContainerType == "item"){
        newGame.items[parseInt(parentContainerName)].addItem(
            itemName.toLowerCase(),
            generatedItem
        )
    }
    
    if ((<HTMLInputElement>document.getElementById("collectible")).checked == true){
        newGame.items[itemID].collectable = true
    }
    if ((<HTMLInputElement>document.getElementById("edible")).checked == true){
        newGame.items[itemID].edible = true
    }
    if ((<HTMLInputElement>document.getElementById("drinkable")).checked == true){
        newGame.items[itemID].drinkable = true
    }
    if ((<HTMLInputElement>document.getElementById("poisonous")).checked == true){
        newGame.items[itemID].poisonous = true
    }
    if ((<HTMLInputElement>document.getElementById("flammable")).checked == true){
        newGame.items[itemID].flammable = true
    }
    if ((<HTMLInputElement>document.getElementById("alight")).checked == true){
        newGame.items[itemID].alight = true
    }
    if ((<HTMLInputElement>document.getElementById("locked")).checked == true){
        newGame.items[itemID].locked = true
    }
    if ((<HTMLInputElement>document.getElementById("open")).checked == true){
        newGame.items[itemID].open = true
    }
    if ((<HTMLInputElement>document.getElementById("hidden")).checked == true){
        newGame.items[itemID].hidden = true
    }
    if ((<HTMLInputElement>document.getElementById("pushable")).checked == true){
        newGame.items[itemID].pushable = true
    }
    // if ((<HTMLInputElement>document.getElementById("throwable")).checked == true){
    //     newGame.items[itemID].throwable = true
    // }
    if ((<HTMLInputElement>document.getElementById("breakable")).checked == true){
        newGame.items[itemID].breakable = true
    }
    if ((<HTMLInputElement>document.getElementById("broken")).checked == true){
        newGame.items[itemID].broken = true
    }

    itemID += 1;


    (<HTMLDivElement> document.getElementById("newItem")).style.display = "none";
    (<HTMLDivElement> document.getElementById("newButtons")).style.display = "inline"

}



function outputJSON(){
    let jsonOutput = JSON.stringify((<any>JSON).decycle(newGame))
    let outputArea = <HTMLTextAreaElement>document.getElementById("outputField")

    outputArea.innerHTML = jsonOutput

}