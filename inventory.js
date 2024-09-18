//inventory.js
//chris hamby
//here we make the objects that can be in the inventory
//as well as functions dealing with the inventory

var INVENTORY = [];			//an array of inventory objects
var MAX_INVENTORY_SIZE = 3;	//how many things can we hold?

var TABLE_LEG = {
	NAME: "table leg",
	ATTACK: 1
};

//push the new item to the inventory
function ADD_TO_INVENTORY(myItem){
	if(INVENTORY.length >= MAX_INVENTORY_SIZE)	return;		//no more room in the inventory; exit function
	INVENTORY.push(myItem);			//push the new item into the inventory array
	refreshInventoryDisplay();		//update
	return 1;
}

//take an item out of the inventory
function REMOVE_FROM_INVENTORY(myItem){
	var myVal = myItem.NAME;			//name of the object to remove
	var i;			
	for(i=0; i<INVENTORY.length; i++){	//look for the item
		if(INVENTORY[i].NAME == myVal){	//we found the item!
			INVENTORY.splice(i,1);		//remove one item from INVENTORY at index i
			refreshInventoryDisplay();	//update
			break;
		}
	}
}

//see if the item is in the inventory
function IS_IN_INVENTORY(myItem){
	var itemName = myItem.NAME;			//what object are we looking for?
	for(i=0; i<INVENTORY.length; i++){
		if(INVENTORY[i].NAME == itemName)	//we found the item!
			return true;
	}
	return false;
}

//check to see if the radio button is selected
function IS_SELECTED(myItem){
	var i;
	var itemName = myItem.NAME;	
	var radioID;
	var nameSlot;
	var isItChecked;
	if(IS_IN_INVENTORY(myItem)==false)	return 0;
	for(i=0; i<INVENTORY.length; i++){
		radioID = "item"+i;				//which radio button to check
		nameSlot = "item"+i+"Name";		//which text span to check
		isItChecked = document.getElementById(radioID).checked;		//true if the radio button is selected
		if(isItChecked){
			if(document.getElementById(nameSlot).innerHTML == itemName){
				return true;
			}
		}
	}
	return false;
}


//update the inventory block
//first, all items are set to invisible and deselected
//next, the items we have are sent to be displayed
function refreshInventoryDisplay(){
	var i;
	var thisItem;
	var nameSlot;
	for(i=0; i<MAX_INVENTORY_SIZE; i++){ //hide all inventory items by default
		thisItem = "item"+i;
		nameSlot = "item"+i+"Name";
		document.getElementById(thisItem).disabled = true;	//hide the button
		document.getElementById(nameSlot).innerHTML = "";	//hide the text by the button
		document.getElementById(thisItem).checked = false;	//deselect all items 
	}
	
	
	if(INVENTORY.length>0)	 //show the inventory box if you have an item
		document.getElementById("inventory").style.visibility = "visible";
	
	
	for(i=0; i<INVENTORY.length; i++){	//show available inventory items 
		thisItem = "item"+i;
		nameSlot = "item"+i+"Name";
		//set the button's value (what we see later)
		document.getElementById(thisItem).value = INVENTORY[i].NAME;
		//set the text beside the button (not the same as value)
		document.getElementById(nameSlot).innerHTML = INVENTORY[i].NAME;
		//enable selecting the item in the inventory
		document.getElementById(thisItem).disabled = false;
		setDebugMsg(document.getElementById(thisItem).value);
	}
}


