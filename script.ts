"use strict"

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

    
    // Constructor for new items.
    constructor(public itemName: string, public weight:number, public place:Place, description:string, examination:string, movable:boolean) { 
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
        // let cabin = new Place("You find yourself awake in a cabin alone with no memory of how you got there.","Reach outside.")
        // let outsideOfCabin = new Place("You are now outside of the cabin, finding yourself in the middle of an unknown, unfamiliar forest","You need to gather supplies")
        // if (localStorage.getItem("game") === null) {
        //     let cabin = new Place("You find yourself awake in a cabin alone with no memory of how you got there.","Reach outside.")
        //     let outsideOfCabin = new Place("You are now outside of the cabin, finding yourself in the middle of an unknown, unfamiliar forest","You need to gather supplies")
        // }
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
        let inventoryList = (player.inventory).value;
        for(let i = 0;i < inventoryList ;i++){
            
        }
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
let cabin = new Place("Cabin", "You find yourself awake in a cabin alone with no memory of how you got there.","Reach outside.")
cabin.addPlace("north", new Place("OutsideCabin","You are now outside of the cabin, finding yourself in the middle of an unknown forest.","You need to collect supplies."))
let player = new Player(cabin,0,true)
cabin.addItem("key", new Item("Key", 1, cabin, "It appears to be an antique brass key", "This key looks like it would fit the door", true))
cabin.addItem("door", new Item("Door", 10, cabin, "This is a door", "It's made of wood and looks heavy", false))
player.place.items.door.locked = true


// Gets the id of userInput and stores it in a variable, then adds an event handler when a key is pressed it exacutes a function
let userInput = <HTMLInputElement> document.getElementById("userInput")
userInput.addEventListener("keypress", keyPressed)

