"use strict"
//part of save game function
let game:Game[]=[]

let player:Player

let s:string=localStorage.getItem("game")!
if(s!=null){
    player=JSON.parse(s)
}

class Game{
    progress:any="" //new class for the save game
}
// Sets the player class, including all of the properties related to the player, for example where they are
class Player{ 
    inventory: Record <string, Item>
    place: Place
    time: number
    alive: boolean = true

    constructor(place:Place, time: number, alive : boolean){
        this.inventory ={}
        this.place = place
        this.time = time
        this.alive = alive 
    }
}

// Creates a class that controls all of the properties for items, eg their weights and descriptions
class Item {
    // itemName: string
    // weight: number
    // place: Place
    description: string = "No further information"
    examination:string
    alight: boolean = false
    broken: boolean = false
    locked:boolean = false
    movable:boolean
    closed:boolean = true
    hidden:boolean = true

    
    // Constructor for new items.
    constructor(public itemName:string, public weight:number, public place:Place, description:string, examination:string, movable:boolean) { 
        this.weight = weight
        this.place = place
        this.description = description
        this.examination = examination
        this.movable = movable
    }

    // Methods related to items
    
}

// Creates a class for places including properties such as including other nearby places, what items are in this location
class Place{
    name:string
    description:string
    nearby: Record <string, Place> = {}
    items: Record <string, Item> = {}
    hints: string 
    
    
    constructor(name:string, description:string, hints:string){
        this.name = name
        this.description=description
        this.nearby={}
        this.hints = hints
    }
    
    // When called, returns the description, nearby items and nearby places to be shown on screen
    fullDescription():string{
        return `
        ${player.place.description}<br>
        You see: ${listProperties(player.place.items)}<br>
        You can go: ${listProperties(player.place.nearby)}<br>
        `
    }

    // Links a new place to the current one and also creates a reverse link so you can go back to the previous place
    addPlace(direction:string,place:Place){
        this.nearby[direction]=place
        let previousDirection = ""
        if (direction == "north"){
            previousDirection = "south"
        }
        else if (direction == "south"){
            previousDirection = "north"
        }
        else if (direction == "east"){
            previousDirection = "west"
        }
        else if (direction == "west"){
            previousDirection = "east"
        }
        else if (direction == "up"){
            previousDirection = "down"
        }
        else if (direction == "down"){
            previousDirection = "up"
        }
        place.nearby[previousDirection] = this
        return place // return a reference to the place we just added (so we can chain adds)
    }

    addItem(name:string, item:Item){
        this.items[name]=item
    }
}

// Takes the key press input from the listener event (see userInput variable) and if it was an enter calls the execute function using the users input.
function keyPressed (e:KeyboardEvent){
    if (e.key == "Enter"){
        execute(userInput.value)
        userInput.value = ""
    }
}

// This function contains all of the command options available in the game
function execute (command:string){
    
    let words = command.toLowerCase().split(" ")

    if (words[0]=="play"){
        // if (localStorage.getItem("game") === null) {
        //     let cabin = new Place("You find yourself awake in a cabin alone with no memory of how you got there.","Reach outside.")
        //     let outsideOfCabin = new Place("You are now outside of the cabin, finding yourself in the middle of an unknown, unfamiliar forest","You need to gather supplies")
        // }

        let cabin = new Place("Cabin", "You find yourself awake in a cabin alone with no memory of how you got there.","Reach outside.")
        cabin.addItem("Key", new Item("key",1, cabin, "It appears to be an antique brass key", "This key looks like it would fit the door", true))
        cabin.addItem("Hat", new Item("hat",2, cabin, "It appears to be a wooly hat", "This hat looks like it could keep some ears warm", true))
        cabin.addItem("Coat", new Item("coat", 3, cabin, "It appears to be a windproof coat", "This coat looks like it would keep the wind off any exposed skin", true ))
        cabin.addItem("Gloves", new Item("gloves", 2, cabin, "It appears to be a pair of wooly gloves", "These gloves would keep some hands warm", true ))
        cabin.addItem("Boots", new Item("boots", 2, cabin, "It appears to be a pair of work boots", "These boots look nice and comfy", true ))
        cabin.addItem("Door", new Item("door", 10, cabin, "This is a door", "It's made of wood and looks heavy", false))
        cabin.addItem("Window", new Item("window", 10, cabin, "It appears to be a normal window with a pane of glass in", "It appears that the window is slightly a jar", false))
        cabin.addItem("Fireplace", new Item("fireplace", 10, cabin, "It appears to be a brick fireplace", "This fireplace seems to have a firewood holder in middle of it", false))
        cabin.addItem("Bed", new Item("bed", 10, cabin, "It appears to be a messy bed as if someone woke up in it", "This bed looks comfy to sleep in", false))
        cabin.addItem("Table", new Item("table", 10, cabin, "it appears to be an oak table with a single chair", "This table looks like it has a key on it", false))
        cabin.addItem("Chair", new Item("chair", 10, cabin, "it appears to be an oak chair", "This chair looks like it would be uncomfortable to sit in for a long period of time", false))

        let outsideCabin = cabin.addPlace("north", new Place("outsideCabin","You are now outside of the cabin, finding yourself in the middle of an unknown forest.","You need to collect supplies."))
        outsideCabin.addItem("Backpack", new Item("", 2, outsideCabin, "It appears to be a hiking backpack", "This backpack looks like it could hold some items", false))

        let topLeftCabin = outsideCabin.addPlace("west", new Place("topLeftCabin","You find yourself just ouside of the cabin to the left",""));
        topLeftCabin.addItem("Tree Stump", new Item("treeStump", 10, outsideCabin, "It appears that the stump has been used for splitting logs", "This tree stump appears to have an axe sticking in it with 4 pieces of firewood laying on the floor", false))
        // topLeftCabin.addItem("Axe", new Item("Axe", 5, outsideCabin, "It appears to be a heavy steel axe with a wooden handle", "This axe looks like  it would be good for cutting tree down and splitting logs", false))
        let leftSideCabin = topLeftCabin.addPlace("south", new Place("leftSideCabin","You find yourself outside of the cabin, at the other side of the window",""));
        let bottomLeftCabin = leftSideCabin.addPlace("south", new Place("bottomLeftCabin","You find yourself at the back left of the cabin",""));

        let topRightCabin = outsideCabin.addPlace("east", new Place("topRightCabin","You find yourself just ouside of the cabin to the right",""));
        let rightSideCabin = topRightCabin.addPlace("south", new Place("rightSideCabin","You find yourself outside of the cabin at the right side",""));
        rightSideCabin.addItem("Firewood Storage", new Item("firewoodStorage", 10, outsideCabin, "It appears to be storage for firewood", "This firewood storage bin looks like it contains 25 pieces of firewood", false))
        // rightSideCabin.addItem("Firewood Log", new Item("Firewood Log", 3, outsideCabin, "It appears to be a piece of oak", "This firewood is perfect for burning", false))
        let bottomRightCabin = rightSideCabin.addPlace("south", new Place("bottomRightCabin","You find yourself at the back right of the cabin",""));

        let backOfCabin = bottomLeftCabin.addPlace("east", new Place("backOfCabin","You find yourself at the back of the cabin",""))

        player = new Player(cabin,0,true)
        player.place.items.Door.locked = false
    }

    else if (words[0]=="create"){
        
    }

    else if("north,east,south,west,up,down".includes(words[0])){
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
        let card=document.createElement("div")
        card.classList.add("card")
        document.getElementById("main")?.appendChild(card)
        
        let para=document.createElement("p")
        para.classList.add("para")
        card.appendChild(para)
        para.innerHTML=player.place.hints
        let para2=document.createElement("p")
        para2.classList.add("para")
        card.appendChild(para2)
        para2.innerHTML="I don't know how to add multiple lines"
    }
    
    else if (words[0]=="shout"){
        
    }
    
    else if (words[0] == "inventory"){
        // let inventoryList = (player.inventory).value;
        // for(let i = 0;i < inventoryList ;i++){
            
        // }
    }
    
    output (player.place.fullDescription())
}

// Reads the values in an object (using the parameter o) and appends them to a string so that it can be output.
function listProperties(o:object):string{
    
    let output:string = ""
    for (let i in o){
        output += i + ", "
    }
    return output
}

function output (input:string){
    document.getElementById("outputBox")!.innerHTML += input + "<br>"
}




// let room = new Place("You are now inside an empty room.","")

// Gets the id of userInput and stores it in a variable, then adds an event handler when a key is pressed it executes a function
let userInput = <HTMLInputElement> document.getElementById("userInput")
userInput.addEventListener("keypress", keyPressed)

//from here down is the save game function
function $(id:string):HTMLElement{
    return document.getElementById(id)!


}

function saveGame(){
game.push ({progress:(<HTMLInputElement>$("userInput")!).value})
savesaveGame()
}

let savebutton = document.getElementById("save")
savebutton!.addEventListener("click", saveGame)

function savesaveGame(){
    let s = JSON.stringify(player)
    localStorage.setItem("game",s)
}