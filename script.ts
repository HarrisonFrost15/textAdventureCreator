"use strict"

class Player{
    inventory: Record <string, Item>
    place: Place
    time: number
    alive: boolean = true

    constructor(inventory : Record <string, Item>, place:Place, time: number, alive : boolean){
        this.inventory ={}
        this.place = place
        this.time = time
        this.alive = alive 
    }
}

class Item {
    weight: number
    place: Place
    description: string = "No further information"
    alight: boolean = false
    broken: boolean = false
    
    constructor(weight:number, place:Place, description:string) { 
        this.weight = weight
        this.place = place
        this.description = description
        
    }
}

class Place{
    description:string
    nearby: Record <string, Place> = {}
    items: Record <string, Item> = {}
    
    constructor(description:string ,nearby: Record <string, Place>){
        this.description=description
        this.nearby={}
    }
}

function keyPressed (e:KeyboardEvent){
    if (e.key == "Enter"){
        execute(userInput.value)
        userInput.value = ""
    }
}

function execute (command:string){

}

let userInput = <HTMLInputElement> document.getElementById("userInput")
userInput.addEventListener("keypress", keyPressed)