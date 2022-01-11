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

// Defines items that exist in the world, these can be obstacles or items the player can pick up.
class Item {
    // itemName: string
    // weight: number
    // place: Place
    description: string = "No further information"
    alight: boolean = false
    broken: boolean = false
    locked:boolean = false
    movable:boolean
    closed:boolean = true
    hidden:boolean = true

    
    // Constructor for new items.
    constructor(public itemName:string, public weight:number, public place:Place, description:string, movable:boolean) { 
        this.itemName = itemName
        this.weight = weight
        this.place = place
        this.description = description
        this.movable = movable
    }

    // Methods related to items
    
}

// // Creates a class for places including properties such as including other nearby places, what items are in this location
class Place{
    name:string
    description:string = "No further information"
    nearby: Record <string, Place> = {}
    items: Record <string, Item> = {}
    hints: string 
    
    constructor(name:string, description:string, hints:string){
        this.name = name
        this.description = description
        this.nearby = {}
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

//     // Links a new place to the current one and also creates a reverse link so you can go back to the previous place
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