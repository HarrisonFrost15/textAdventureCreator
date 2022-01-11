"use strict"
//part of save game function
// let game:Game[]=[]

let player:Player

// let s:string=localStorage.getItem("game")!
// if(s!=null){
//     player=JSON.parse(s)
// }

// class Game{
//     progress:any="" //new class for the save game
// }


//Starts default game
let startButton = <HTMLButtonElement> document.getElementById("play")
startButton.addEventListener("click", startDefault)

function startDefault(){

    let cabin = new Place("Cabin", "You find yourself awake in a cabin alone with no memory of how you got there.","Reach outside.")
    cabin.addItem("key", new Item("key",1, cabin, "It appears to be an antique brass key", true))
    cabin.addItem("hat", new Item("hat",2, cabin, "It appears to be a wooly hat", true))
    cabin.addItem("coat", new Item("coat", 3, cabin, "It appears to be a windproof coat", true ))
    cabin.addItem("gloves", new Item("gloves", 2, cabin, "It appears to be a pair of wooly gloves", true ))
    cabin.addItem("boots", new Item("boots", 2, cabin, "It appears to be a pair of work boots", true ))
    cabin.addItem("door", new Item("door", 10, cabin, "This is a door", false))
    cabin.addItem("window", new Item("window", 10, cabin, "It appears to be a normal window with a pane of glass in", false))
    cabin.addItem("fireplace", new Item("fireplace", 10, cabin, "It appears to be a brick fireplace", false))
    cabin.addItem("bed", new Item("bed", 10, cabin, "It appears to be a messy bed as if someone woke up in it", false))
    cabin.addItem("table", new Item("table", 10, cabin, "it appears to be an oak table with a single chair", false))
    cabin.addItem("chair", new Item("chair", 10, cabin, "it appears to be an oak chair", false))

    let outsideCabin = cabin.addPlace("north", new Place("outsideCabin","You are now outside of the cabin, finding yourself in the middle of an unknown forest.","You need to collect supplies."))
    outsideCabin.addItem("Backpack", new Item("", 2, outsideCabin, "It appears to be a hiking backpack", false))

    let topLeftCabin = outsideCabin.addPlace("west", new Place("topLeftCabin","You find yourself just ouside of the cabin to the left",""));
    topLeftCabin.addItem("Tree Stump", new Item("treeStump", 10, outsideCabin, "It appears that the stump has been used for splitting logs", false))
    // topLeftCabin.addItem("Axe", new Item("Axe", 5, outsideCabin, "It appears to be a heavy steel axe with a wooden handle", "This axe looks like  it would be good for cutting tree down and splitting logs", false))
    let leftSideCabin = topLeftCabin.addPlace("south", new Place("leftSideCabin","You find yourself outside of the cabin, at the other side of the window",""));
    let bottomLeftCabin = leftSideCabin.addPlace("south", new Place("bottomLeftCabin","You find yourself at the back left of the cabin",""));

    let topRightCabin = outsideCabin.addPlace("east", new Place("topRightCabin","You find yourself just ouside of the cabin to the right",""));
    let rightSideCabin = topRightCabin.addPlace("south", new Place("rightSideCabin","You find yourself outside of the cabin at the right side",""));
    rightSideCabin.addItem("Firewood Storage", new Item("firewoodStorage", 10, outsideCabin, "It appears to be storage for firewood", false))
    // rightSideCabin.addItem("Firewood Log", new Item("Firewood Log", 3, outsideCabin, "It appears to be a piece of oak", "This firewood is perfect for burning", false))
    let bottomRightCabin = rightSideCabin.addPlace("south", new Place("bottomRightCabin","You find yourself at the back right of the cabin",""));

    let backOfCabin = bottomLeftCabin.addPlace("east", new Place("backOfCabin","You find yourself at the back of the cabin",""))

    player = new Player(cabin,0,true)
    player.place.items.door.locked = true

    output (player.place.fullDescription())
}

// Gets the id of userInput and stores it in a variable, then adds an event handler when a key is pressed it executes a function
let userInput = <HTMLInputElement> document.getElementById("userInput")
userInput.addEventListener("keypress", keyPressed)

// Takes the key press input from the listener event (see userInput variable) and if it was an enter calls the execute function using the users input.
function keyPressed (e:KeyboardEvent){
    if (e.key == "Enter"){
        execute(userInput.value)
        userInput.value = ""
    }
}

// Adds the output text to the end of the game text
function output (input:string){
    document.getElementById("outputBox")!.innerHTML += input + "<br>"
}

// Reads the values in an object (using the parameter o) and appends them to a string so that it can be output.
function listProperties(o:object):string{
    
    let output:string = ""
    for (let i in o){
        output += i + ", "
    }
    return output
}


// This function contains all of the command options available in the game
function execute (command:string){
    
    let card = <HTMLDivElement> document.getElementById("card")
    card.style.display = "none"
    let words = command.toLowerCase().split(" ")


    if("north,east,south,west,up,down".includes(words[0])){
        player.place=player.place.nearby[words[0]]
    }
    
    
    else if(words[0]=="jump"){
        if("north,east,south,west".includes(words[1])){
            player.place=player.place.nearby[words[1]]
        }
        
    }
    else if (words[0] == "open"){
        if (player.place.items[words[1]].closed == false){
           player.place.items[words[1]].closed = false
            output("It is now open")
        }
    }
    else if (words[0] == "close"){
        if (player.place.items[words[1]].closed == true){
            player.place.items[words[1]].closed = true
            output("It is already closed")
        }
    }
    else if(words[0] == "unlock"){
        if (player.place.items[words[1]].locked && player.inventory.hasOwnProperty("key")){
            player.place.items.obstacle.locked = false
        }
        else if (player.place.items[words[1]].locked && ! player.inventory.hasOwnProperty("key")){
            output("You need a key")
        }
        else if (player.place.items[words[1]].locked == false){
            output("It's already unlocked")
        }
    }
    

    else if (words[0] == "lock"){
        if (player.place.items[words[1]].locked){
            output("This is already locked")
        }
        else if (player.place.items[words[1]].locked == false){
            player.place.items[words[1]].locked = true
            output("You have locked this")
        }
    }

    else if (words[0] == "dig") {
        if(player.inventory.hasOwnProperty("shovel")){
            
            // Object.values(player.place.items).forEach(i =>{ 
            //     if (i.hidden) {
            //         i.hidden = false
            //         output(`You have dug an ${i.itemName} out!`)
            //     }
            // })
            for(let i in player.place.items){
                let item = player.place.items[i]
                if (item.hidden) {
                    item.hidden = false
                    output(`You have dug a ${item.itemName} out!`)
                }
            }
        }
    }

    
    else if(words[0]=="climb"){
        if("north,east,south,west,up,down".includes(words[1])){
            player.place=player.place.nearby[words[1]]
        }
    }

    else if (words[0]=="take"){
        if (player.place.items.hasOwnProperty(words[1])){  //does this players, place, items object have a 'key' (property) with the name in words[1]
            player.inventory[words[1]]=player.place.items[words[1]]  //if yes, put the item from the player's place .. into the players inventory
            delete player.place.items[words[1]] //remove it from the place
        }
    }

    else if (words[0]=="drop") {
        if (player.inventory.hasOwnProperty(words[1])){
            player.place.items[words[1]]=player.inventory[words[1]]
            delete player.inventory[words[1]]
        }
    }

    else if (words[0]=="hint"){
        
        let para = <HTMLParagraphElement>document.getElementById("para")
        para.innerHTML = ""
        para.innerHTML=player.place.hints

        card.style.display = "block"

    }
    
    else if (words[0]=="shout"){
        
    }
    
    else if (words[0] == "inventory"){
        // let inventoryList = (player.inventory).value;
        // for(let i = 0;i < inventoryList ;i++){
            
        // }
    }
    
    else if (words[0] == "examine"){
        if (player.place.items.hasOwnProperty(words[1])){
            output(`${player.place.items[words[1]].description}<br>`)
        }
        else if (player.inventory.hasOwnProperty(words[1])){
            output(`${player.inventory[words[1]].description}<br>`)
        }
        else{
            return "very sadly, you cannot examine this"
        }
    }

    output (player.place.fullDescription())
}


// //from here down is the save game function
// function $(id:string):HTMLElement{
//     return document.getElementById(id)!


// }

// function saveGame(){
//     game.push ({progress:(<HTMLInputElement>$("userInput")!).value})
//     savesaveGame()
// }

// let savebutton = document.getElementById("save")
// savebutton!.addEventListener("click", saveGame)

// function savesaveGame(){
//     let s = JSON.stringify(player)
//     localStorage.setItem("game",s)
// }