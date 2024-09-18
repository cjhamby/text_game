//scenes.js
//edit this file to add to the narrative of the game

//scene template
//add to it as necessary
//copy and paste, replace <n> with scene number
var scenen = {
	sceneText:"hey",	//the narrative block
	a1:"",				//action one
	a2:"",				//action two
	n1:0,				//where action 1 takes us
	n2:0,				//where action 2 takes us
	f1: function() {return 1;},	//what action 1 does
	f2: function() {return 1;}	//what action 2 does
};


var scene0 = {
	sceneText:"You see a door",
	a1:"open the door",
	a2:"stare at the door",
	n1:2,	
	n2:1,
	f1: function() {return 1;},
	f2: function() {return 1;}
};


var scene1 = {
	sceneText:"...you still see a door",
	a1:"open the door",
	a2:"keep staring",
	n1:2,	
	n2:1,	
	f1: function() {return 1;},
	f2: function() {	//for the danger-averse
		addDotsToSceneText();
		return 1;
	}
};


var scene2 = {
	sceneText:"You push open the door and look inside.</br>In the middle of the room is a table.",
	a1:"inspect the table",
	a2:"",
	n1:3,
	n2:2,
	f1: function() {return 1;},
	f2: function() {return 1;}
};


var scene3 = {
	sceneText:"The table seems to be made out of cheap plywood. It would probably break easily.",
	a1:"strike",
	a2:"keep inspecting",
	n1:5,
	n2:4,
	f1: function() {
		scene8.sceneText = "Your violence ceases to blind you, and "+scene8.sceneText;
		stamina-=10;
		return 1;
	},
	f2: function() {return 1;}
};


var scene4 = {
	sceneText:"There's a switch on the middle of the table.</br>This seems like a test...",
	a1:"flip the switch",
	a2:"refuse, pound the table and\ndemand an explanation",
	n1:9,
	n2:5,
	f1: function() {return 1;},
	f2: function() {return 1;}
};
 
 
var scene5 = {
	sceneText:"The table wobbles a bit.</br>One of the back legs comes unglued.</br>",
	a1:"strike again",
	a2:"pick up the leg",
	n1:6,
	n2:5,
	f1: function() {
			if(IS_SELECTED(TABLE_LEG)){
				scene6.sceneText = "You strike the table with its own leg!  How would you feel if it did the same to you?";
			}
			stamina-=20;
			return 1;
		},
	f2: function() {					//add the leg to the inventory
			this.sceneText = "You obtain a table leg!</br>Now, about the rest of the table...";
			this.a2 = "let it live";
			if(INVENTORY.length==0)
				ADD_TO_INVENTORY(TABLE_LEG);
			else
				this.n2 = 8;
			refreshValues();
			return 1;
		}
};


var scene6 = {
	sceneText:"The table falls over.",
	a1:"strike AGAIN",
	a2:"let it live",
	n1:7,	
	n2:8,
	f1: function() {
			stamina-=30;
			return 1;
		},
	f2: function() {return 1;}
};


var scene7 = {
	sceneText:"The table tumbles around some.",
	a1:"strike AGAIN",
	a2:"let it live",
	n1:7,	
	n2:8,
	f1: function() {
		this.sceneText = "The table tumbles around some.</br>Shouldn't you show mercy?";
		if(this.a1 ==("strike AGAIN")){
			this.a1 = "AGAIN";
			this.a2 = "show mercy";
		} else {
			this.n1 = 8;
			stamina = 0;
			scene8.sceneText = "You exhaust yourself...</br>But you only manage to turn the table right-side up again...</br>" + scene8.sceneText;
		}
		refreshValues();
		return 1;
	},
	f2: function() {return 1;}
};


var scene8 = {
	sceneText:"You now notice a ladder on the far wall.",	//the narrative block
	a1:"climb it",		//action one
	a2:"",				//action two
	n1:10,				//where action 1 takes us
	n2:0,				//where action 2 takes us
	f1: function() {
			stamina+=10;
			return 1;
		},	
	f2: function() {return 1;}	//what action 2 does
};


var scene9 = {
	sceneText:"You push the switch. It slides from under your hand. Why was there a disconnected switch on the table?</br>",	//the narrative block
	a1:"Keep looking around",				//action one
	a2:"",				//action two
	n1:8,				//where action 1 takes us
	n2:0,				//where action 2 takes us
	f1: function() {return 1;},	//what action 1 does
	f2: function() {return 1;}	//what action 2 does
}

var scene10 = {
	sceneText:"When you get to the top of the stairs, you hear someone cry out: \"we have an escapee!\"</br>A shadowy figure emerges towards you!",	//the narrative block
	a1:"Strike at its legs",		//action one
	a2:"Run somewhere!",			//action two
	n1:11,				//where action 1 takes us
	n2:12,				//where action 2 takes us
	f1: function() {
			if(IS_SELECTED(TABLE_LEG)){
				scene11.sceneText = "You throw the table leg at their legs.</br>It bounces off.  You may have bruised them!</br>The figure is upon you!";
				REMOVE_FROM_INVENTORY(TABLE_LEG);
			}
			else{
				scene13.sceneText = "The figure lunges towards you.  You strike at their legs, causing them to topple over.  You've bought a little time to assess the situation.";
				scene13.a1 = "";
				scene13.a2 = "";
			
			}
			return 1;
		},
	f2: function() {
			if(stamina<20){
				scene11.sceneText = "You don't have the energy to run! The figure is upon you!",
				this.n2 = 11;
			}
			else{
				stamina-=10;
			}
			return 1;
		}	//what action 2 does
};

//couldn't escape figure
var scene11 = {
	sceneText:"The figure is upon you!",
	a1:"Struggle",
	a2:"",
	n1:13,
	n2:0,
	f1: function() {return 1;},	//what action 1 does
	f2: function() {return 1;}	//what action 2 does
};

//escaped figure
var scene12 = {
	sceneText:"You quickly scan the room, and run towards what looks like an doorway.  Fortunately, it is a doorway.",
	a1:"turn left",
	a2:"turn right",
	n1:0,
	n2:0,
	f1: function() {return 1;},
	f2: function() {return 1;}
};

//held 
var scene13 = {
	sceneText:"The figure puts a hand over your mouth.  \"Shhhhhh...you don't want it to hear you.\"  You hear screams from the nearby doorway, joined by loud scraping sounds and thumping.",
	a1:"",
	a2:"",
	n1:0,	
	n2:0,
	f1: function() {return 1;},
	f2: function() {return 1;}
};

var scene_ = {
	sceneText:"",
	a1:"",
	a2:"",
	n1:0,	
	n2:0,
	f1: function() {return 1;},
	f2: function() {return 1;}
};




var scenexxx = {
	sceneText:"hIS LEGS ARE SPREAD",	//the narrative block
	a1:"uSE YOUR mOUTH",				//action one
	a2:"uSE YOUR gENITALIA",			//action two
	n1:0,				//where action 1 takes us
	n2:0,				//where action 2 takes us
	f1: function() {return 1;},	//what action 1 does
	f2: function() {return 1;}	//what action 2 does
};



//make sure to add every scene to this array
var scenes=[
	scene0,
	scene1,
	scene2,
	scene3,
	scene4,
	scene5,
	scene6,
	scene7,
	scene8,
	scene9,
	scene10,
	scene11,
	scene12
];