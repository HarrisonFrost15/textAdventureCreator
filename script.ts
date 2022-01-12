"use strict"


let player:Player

let s:string=localStorage.getItem("game")!
if(s!=null){
    player = ((<any>JSON).retrocycle)((<any>JSON).parse(s));
}

let startButton = <HTMLButtonElement> document.getElementById("play")
startButton.addEventListener("click", startDefault)

function startDefault(){

    let cabin = new Place("Cabin", "You find yourself awake in a cabin alone with no memory of how you got there.","Reach outside.")
    cabin.addItem("key", new Item("key",1, cabin, "It appears to be an antique brass key", "This key looks like it would a door", true, true, true, false, false))
    cabin.addItem("hat", new Item("hat",2, cabin, "It appears to be a wooly hat", "This hat looks like it could keep some ears warm", true, false, true, true, false))
    cabin.addItem("coat", new Item("coat", 3, cabin, "It appears to be a windproof coat", "This coat looks like it would keep the wind off any exposed skin", true, false, true, true, false ))
    cabin.addItem("gloves", new Item("gloves", 2, cabin, "It appears to be a pair of wooly gloves", "These gloves would keep some hands warm", true, false, true, true, false ))
    cabin.addItem("boots", new Item("boots", 2, cabin, "It appears to be a pair of work boots", "These boots look nice and comfy", true,false ,true, true, false ))
    cabin.addItem("door", new Item("door", 10, cabin, "This is a door", "This door appears to be locked, find the key to unlock and open the door", false, true, false, true, false))
    cabin.addItem("window", new Item("window", 10, cabin, "It appears to be a normal window with a pane of glass in", "It appears that the window is slightly a jar", false, true, false, false, false))
    cabin.addItem("fireplace", new Item("fireplace", 10, cabin, "It appears to be a brick fireplace", "This fireplace seems to have a firewood holder in middle of it", false, false, false, true, false))
    cabin.addItem("bed", new Item("bed", 10, cabin, "It appears to be a messy bed as if someone woke up in it", "This bed looks comfy to sleep in", false, true, false, true, false))
    cabin.addItem("table", new Item("table", 10, cabin, "it appears to be an oak table with a single chair", "This table looks like it has a key on it",false, true, false, true, false))
    cabin.addItem("chair", new Item("chair", 10, cabin, "it appears to be an oak chair", "This chair looks like it would we uncomfortable to sit in", false, true, true, false, true))
    let drawer = new Item("drawer",15,cabin,"It appears to be an oak drawer","it happens to have a silver knife inside it",false, true, false, false,false)
    cabin.addItem("drawer", drawer)
    drawer.contents["knife"]= new Item("knife",2,cabin,"It appears to be a silver knife","This knife can be used to attack", true, false, true, false, false)


    let outsideCabin = cabin.addPlace("north", new Place("outsideCabin","You are now outside of the cabin, finding yourself in the middle of an unknown forest.","You need to collect supplies."), new Exit(true))
    outsideCabin.addItem("Backpack", new Item("Backpack", 2, outsideCabin, "It appears to be a hiking backpack", "This backpack looks like it could hold some items", false, true, true, true, false))

    let topLeftCabin = outsideCabin.addPlace("west", new Place("topLeftCabin","You find yourself just ouside of the cabin to the left",""), new Exit(true));
    topLeftCabin.addItem("Tree Stump", new Item("treeStump", 10, outsideCabin, "It appears that the stump has been used for splitting logs", "This tree stump appears to have an axe sticking in it with 4 pieces of firewood laying on the floor",false, false, false, true, false))
    // needs to be on top of treeStump not in - topLeftCabin.addItem("Axe", new Item("Axe", 5, outsideCabin, "It appears to be a heavy steel axe with a wooden handle", "This axe looks like  it would be good for cutting tree down and splitting logs", false))
    let leftSideCabin = topLeftCabin.addPlace("south", new Place("leftSideCabin","You find yourself outside of the cabin, at the other side of the window",""), new Exit(true));
    let bottomLeftCabin = leftSideCabin.addPlace("south", new Place("bottomLeftCabin","You find yourself at the back left of the cabin",""), new Exit(true));

    let topRightCabin = outsideCabin.addPlace("east", new Place("topRightCabin","You find yourself just ouside of the cabin to the right",""), new Exit(true));
    let rightSideCabin = topRightCabin.addPlace("south", new Place("rightSideCabin","You find yourself outside of the cabin at the right side",""), new Exit(true));
    let firewoodStorage = new Item("firewoodStorage", 10, outsideCabin, "It appears to be storage for firewood","This firewood storage bin looks like it contains 25 pieces of firewood",false, false, false, true, false)
    rightSideCabin.addItem("Firewood Storage", firewoodStorage)
    firewoodStorage.contents["Firewood Log"]=new Item("Firewood Log", 3, outsideCabin, "It appears to be a piece of oak", "This firewood is perfect for burning", true, true, false, true, false)
    let bottomRightCabin = rightSideCabin.addPlace("south", new Place("bottomRightCabin","You find yourself at the back right of the cabin",""), new Exit(true));

    let backOfCabin = bottomLeftCabin.addPlace("east", new Place("backOfCabin","You find yourself at the back of the cabin",""), new Exit(true))
    
    let mineEntrance = backOfCabin.addPlace("south", new Place("mineEntrance", "You find yourself in front of an old abandoned coal mine",""), new Exit(true))
    mineEntrance.addItem("Pickaxe", new Item("Pickaxe", 5, mineEntrance, "It appears to be a steel pickaxe","This pickaxe looks like it could break a rock in two",true,true,true,false))

    let ghostTown = leftSideCabin.addPlace("west", new Place("ghostTown", "You find yourself in the middle of a ghost town",""), new Exit(true))
    ghostTown.addItem("", new Item("", 3, ghostTown, "", "", true, false, false, false))

    player = new Player(cabin,0,true, 20,10)
    player.place.items.door.locked = true

    output (player.place.fullDescription())
}

let ob= <HTMLElement> document.getElementById("outputBox")
function scrollToBottom(){
    ob!.scrollTop=ob!.scrollHeight
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
    if (e.key == 'Enter'){
        scrollToBottom()
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
        if (player.place.exits[words[0]].locked == false){
            player.place=player.place.nearby[words[0]]
        }
        else if (player.place.exits[words[0]].locked == true){
            output("The way is shut <br>")
        }
    }
    
    
    else if(words[0]=="jump"){
        if("north,east,south,west".includes(words[1])){
            player.place=player.place.nearby[words[1]]
        }
        
    }
    
    else if (words[0] == "open"){
        let container=player.place.items[words[1]]
        if (container.open){
            output("It's already opened")
        }
        else{
           container.open = true
           for (let k in container.contents){
               player.place.items[k]=container.contents[k]
           }
           output("It is now open")
        }
    }

    else if (words[0] == "close"){
        if (player.place.items[words[1]].open ){
            player.place.items[words[1]].open = false
            
        }
        else {
            output("It is already closed")
        }
    }
    
    else if(words[0] == "unlock"){
        if (words[1] == "door"){
            if (player.place.exits[words[2]].locked == true && player.inventory.hasOwnProperty("key")){
                player.place.exits[words[2]].locked = false
                output (`You unlock the ${words[2]} door`)
            }
            else if (player.place.exits[words[2]].locked == true && ! player.inventory.hasOwnProperty("key")){
                output ("You need a key")
            }
            else if (player.place.exits[words[2]].locked == false){
                output ("This door is already unlocked")
            }
        }
        
        else {
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
        if (player.carryingWeight < 3) {
            if (player.place.items.hasOwnProperty(words[1])){  //does this players, place, items object have a 'key' (property) with the name in words[1]
                player.inventory[words[1]]=player.place.items[words[1]]  //if yes, put the item from the player's place .. into the players inventory
                delete player.place.items[words[1]] //remove it from the place
            }
        }
        else if (player.carryingWeight > 3) {
            output ("Sorry, your bag is full, drop an item off first before trying to take something else.")
        }
    }

    else if (words[0]=="drop") {
        if (player.inventory.hasOwnProperty(words[1])){
            player.place.items[words[1]]=player.inventory[words[1]]
            delete player.inventory[words[1]]
        }
    }
    
    // else if (words[0]=="push"){
    //     if(player.place.items[words[1]].pushable){
    //        output("It cannot be pushed.")
    //     }
    //     else if( player.place.items[words[1]].pushable){
    //         player.place.items[words[1]].pushable = true
    //         output
    //     }
    // }

    else if (words[0]=="hint"){
        
        let para = <HTMLParagraphElement>document.getElementById("para")
        para.innerHTML = ""
        para.innerHTML=player.place.hints

        card.style.display = "block"

    }
        
    else if (words[0]=="eat"){                             
        if ((player.place.items[words[1]].edible == true) && (player.place.items[words[1]].poisonous == false)) {
            player.health += 5
        }
        else if ((player.place.items[words[1]].edible == true) && (player.place.items[words[1]].poisonous == true)) {
            player.health -= 5
        }
        else if ((player.place.items[words[1]].edible == false)) {
            output ("I don't think you want to eat this")
        }
    }
    
    else if (words[0]=="drink"){                             
        if ((player.place.items[words[1]].drinkable == true) && (player.place.items[words[1]].poisonous == false)) {
            player.stamina += 5
        }
        else if ((player.place.items[words[1]].drinkable == true) && (player.place.items[words[1]].poisonous == true)) {
            player.stamina -= 5
        }
        else if ((player.place.items[words[1]].drinkable == false)) {
            output ("I don't think you can drink this")
        }
    }
    
    else if (words[0] == "attack"){
        if ((player.place.items[words[1]].attackable == true)){
            player.place.items[words[3]].broken == true
        }
    }

    else if (words[0] == "burn") {
        if ((player.place.items[words[1]].flammable == true)) {
            player.place.items[words[1]].alight == true
        }
    }

    else if (words[0] == "examine"){
        if (player.place.items.hasOwnProperty(words[1])){
            output(`${player.place.items[words[1]].description}<br>`)
        }
        else if (player.inventory.hasOwnProperty(words[1])){
            output(`${player.inventory[words[1]].description}<br>`)
        }
        else{
            output ("Sadly, you cannot examine this")
        }
    }

    else if (words[0] == "break"){
        if (player.place.items[words[1]].breakable == true && player.place.items[words[1]].broken == false){
            player.place.items[words[1]].broken = true;
            output (`You have broken the ${words[1]}`)
        } 
        
        else if(player.place.items[words[1]]. breakable == false) {
            output ("You have overestimated your powers. This cannot be broken.")
        }
        else if(player.place.items[words[1]].broken == true){
            output("It's already broken")
        }
    
    }
    

    output (player.place.fullDescription())
    
    
    if (player.health == 0) {
        player.alive == false
        output ("Oh no, you are dead!")
    }
}


let save = document.getElementById("save")
save!.addEventListener("click", savesaveGame)

function savesaveGame(){
    let s = JSON.stringify((<any>JSON).decycle(player))
    localStorage.setItem("game",s)
}