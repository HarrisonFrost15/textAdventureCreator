"use strict";
// let defaultGame
// let defaultLocation = new Place(
//     "Front hall", 
//     "You've come in to your front hall", 
//     "Reach outside"
// )
// defaultGame = new World(
//     "default",
//     new Player(
//         defaultLocation,
//         10,
//         5
//     ),
//     "Find your phone"
// )
// let defaultGameJSON:string = {"worldName":"House","player":{"inventory":{},"place":{"name":"OutsideHouse","description":"You're standing on the front step of your house","nearby":{"north":{"name":"FrontHall","description":"Your front hall","nearby":{"south":{"$ref":"$[\"player\"][\"place\"]"}},"items":{},"exits":{"south":{"locked":true}},"hints":"None"}},"items":{"key":{"itemID":1,"itemName":"key","description":"Your front door key","weight":1,"contents":{},"alight":false,"broken":false,"locked":false,"collectable":true,"open":false,"hidden":false,"pushable":false,"edible":false,"drinkable":false,"poisonous":false,"breakable":true,"attackable":false,"flammable":false,"durability":2}},"exits":{"north":{"$ref":"$[\"player\"][\"place\"][\"nearby\"][\"north\"][\"exits\"][\"south\"]"}},"hints":"Get inside"},"time":0,"alive":true,"health":3,"stamina":2,"carryingWeight":0},"places":{"outsidehouse":{"$ref":"$[\"player\"][\"place\"]"},"fronthall":{"$ref":"$[\"player\"][\"place\"][\"nearby\"][\"north\"]"}},"items":{"1":{"$ref":"$[\"player\"][\"place\"][\"items\"][\"key\"]"}},"startText":"This is your house"}
//# sourceMappingURL=defaultGame.js.map