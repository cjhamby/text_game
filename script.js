//script for adventure game
//these are the basic functions that run the game

// Player Variables ------------------------------------
var currentScene = 0;	//where you are in the narrative
var experiencePts = 0;	//how violent you've been
var stamina = 100;		//how much you've been doing
//------------------------------------------------------


//navigate to the next scene after choosing action 1 
function nextScene_a1(){
	scenes[currentScene].f1();	//run any action1-associated function
	var tempIndex = scenes[currentScene].n1; //get next index
	currentScene = tempIndex;	//update current scene index
	refreshValues();			//put text on the board
}

//navigate to the next scene after choosing action 2
function nextScene_a2(){
	scenes[currentScene].f2();	//run any action2-associated function
	var tempIndex = scenes[currentScene].n2;
	currentScene = tempIndex;
	refreshValues();
}


//append some dots to the beginning of the text
//like, for when you stare at doors
function addDotsToSceneText(){
	scenes[currentScene].sceneText = "..."+scenes[currentScene].sceneText;
	refreshValues();
}

//go to the next scene, troubleshooting mainly
function incrementScenario(){
	currentScene++;
	if(currentScene >= scenes.length)	//restart the loop
		currentScene=0;					//what great storytelling!
	refreshValues();
}

//after we change the scene, we have to update the text
//this function does that
function refreshValues() {
	document.getElementById("scene").innerHTML = currentScene;		//debug message
	document.getElementById("staminaDisplay").innerHTML = stamina;	//show player stats
	document.getElementById("sceneText").innerHTML = "- " + scenes[currentScene].sceneText;	//show the scenario text
	
	//show the new action choices
	document.getElementById("action1").value = scenes[currentScene].a1;
	document.getElementById("action2").value = scenes[currentScene].a2;
	
	//enable or disable action 2 button
	if(scenes[currentScene].a2.length == 0) {
		document.getElementById("action2").disabled = true;
	}
	else {
		document.getElementById("action2").disabled = false;
	}
}


function setDebugMsg(value){
	document.getElementById("debugmsg").innerHTML = value;
}








