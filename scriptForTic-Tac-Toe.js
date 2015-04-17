var startSentence = document.getElementById("start");
var table = document.getElementById("PlayField").rows; // the whole table
var imgO = "url(O.jpg)"; // img used to represent how computer picks
var imgX = "url(X.jpg)"; // img used to represent how users pick
var console = document.getElementById("console"); // console used to display game result or other 
var playing = false; // indicate whether users are playing games
var startButton = document.getElementById("startButton"); // button used to start/restart game
var sel = document.getElementById("sel"); // select used to select how game is hard. 

/*
______________________________

This Function is used to run the whole javascript
______________________________
*/
function run(){
	addEvents();
}

/*
______________________________

This Function is used to add listener
______________________________
*/
function addEvents(){
	document.addEventListener("keydown", keydown, false);
	startButton.addEventListener("click", clickStart);
}

/*
______________________________

This Function is used to reset game. 
______________________________
*/
function reset(){

	for(i = 0; i < table.length; i++){
		var row = table[i].cells;
		for(j = 0; j < row.length; j++){
			row[j].style.background = null;
			row[j].occupied = false;
			row[j].owner = null;
			row[j].addEventListener("click", cellClicked);
			if((i+j) % 2 == 0){
				row[j].style.backgroundColor ="black";
			}else{
				row[j].style.backgroundColor ="grey";
			}
		}
	}
	console.innerHTML = "Have a good game!";

	console.style.color = "red";
	console.style.fontSize = "20px";
}

/*
______________________________

This Function is used to handle keyboard input. 
If users push down "space", then game will reset and start. 
______________________________
*/
function keydown(key){
	if(key.keyCode == 32){
		reset();
		sel.disabled = true;
		playing = true;
	}
}

/*
______________________________

This Function is used to handle the clicking on startButton. 
______________________________
*/
function clickStart(){
	reset();
	sel.disabled = true;
	playing = true;
}

/*
______________________________

This Function is used to check whether someone wins. 
______________________________
*/
function gameOver() {
	var result = false;

	if((table[0].cells[0].owner == table[0].cells[1].owner) && (table[0].cells[0].owner == table[0].cells[2].owner)
		&& table[0].cells[0].occupied && table[0].cells[1].occupied && table[0].cells[2].occupied){
		result = true;
	}
	if((table[1].cells[0].owner == table[1].cells[1].owner) && (table[1].cells[0].owner == table[1].cells[2].owner)
		&& table[1].cells[0].occupied && table[1].cells[1].occupied && table[1].cells[2].occupied){
		result = true;
	}
	if((table[2].cells[0].owner == table[2].cells[1].owner) && (table[2].cells[0].owner == table[2].cells[2].owner)
		&& table[2].cells[0].occupied && table[2].cells[1].occupied && table[2].cells[2].occupied){
		result = true;
	}
	if((table[0].cells[0].owner == table[1].cells[0].owner) && (table[0].cells[0].owner == table[2].cells[0].owner)
		&& table[0].cells[0].occupied && table[1].cells[0].occupied && table[2].cells[0].occupied){
		result = true;
	}
	if((table[0].cells[1].owner == table[1].cells[1].owner) && (table[0].cells[1].owner == table[2].cells[1].owner)
		&& table[0].cells[1].occupied && table[1].cells[1].occupied && table[2].cells[1].occupied){
		result = true;
	}
	if((table[0].cells[2].owner == table[1].cells[2].owner) && (table[0].cells[2].owner == table[2].cells[2].owner)
		&& table[0].cells[2].occupied && table[1].cells[2].occupied && table[2].cells[2].occupied){
		result = true;
	}
	if((table[0].cells[0].owner == table[1].cells[1].owner) && (table[0].cells[0].owner == table[2].cells[2].owner)
		&& table[0].cells[0].occupied && table[1].cells[1].occupied && table[2].cells[2].occupied){
		result = true;
	}
	if((table[0].cells[2].owner == table[1].cells[1].owner) && (table[1].cells[1].owner == table[2].cells[0].owner)
		&& table[0].cells[2].occupied && table[1].cells[1].occupied && table[2].cells[0].occupied){
		result = true;
	}


	return result;
}

/*
______________________________

This Function is used to check if game is tied.
______________________________
*/
function isTied() {
	var result = true;

	for(i = 0; i < table.length; i++){
		var row = table[i].cells;
		for(j = 0; j < row.length; j++){
			if(!row[j].occupied){
				result = false;
			}
		}
	}

	return result;
}
/*
______________________________

This Function is used to handle the event of users clicking table cell.  
______________________________
*/
function cellClicked(){

	if(playing){
		if(this.occupied){
			alert("You cannot pick a square already chosen!");
		}else{
			this.style.background = imgX;
			this.occupied = true;
			this.owner = "player";

			if(gameOver()){
				console.style.fontSize = "35px";
				console.innerHTML = "Congratulation! You are Winner!";
				playing = false;
				sel.disabled = false;
			}else{
				if(isTied()){
					console.style.fontSize = "35px";
					console.innerHTML = "Tied";
					playing = false;
					sel.disabled = false;
				}else{
					computerPlay();

					if(gameOver()){
						console.style.fontSize = "35px";
						console.innerHTML = "Sorry, you lose. ";
						playing = false;
						sel.disabled = false;
					}
				}
			}
		}
	}
}

/*
______________________________

This Function is the first strategy used by normal computer.
It is used to check if there is possibilities of winning within next step.
______________________________
*/
function checkWin(who) {
	var result = false;
	var cell = null;

	var i = 0;
	while(!result && i < 3){
		if(table[i].cells[0].owner == who && table[i].cells[1].owner == who && !table[i].cells[2].occupied){
			cell = table[i].cells[2];
			result = true;
		}else if(table[i].cells[0].owner == who && table[i].cells[2].owner == who && !table[i].cells[1].occupied){
			cell = table[i].cells[1];
			result = true;
		}else if(table[i].cells[1].owner == who && table[i].cells[2].owner == who && !table[i].cells[0].occupied){
			cell = table[i].cells[0];
			result = true;
		}else{
			i++;
		}
	}

	i = 0;
	while(!result && i < 3){
		if(table[0].cells[i].owner == who && table[1].cells[i].owner == who && !table[2].cells[i].occupied){
			cell = table[2].cells[i];
			result = true;
		}else if(table[0].cells[i].owner == who && table[2].cells[i].owner == who && !table[1].cells[i].occupied){
			cell = table[1].cells[i];
			result = true;
		}else if(table[2].cells[i].owner == who && table[1].cells[i].owner == who && !table[0].cells[i].occupied){
			cell = table[0].cells[i];
			result = true;
		}else{
			i++;
		}
	}

	if(!result){
		if(table[0].cells[0].owner == who && table[1].cells[1].owner == who && !table[2].cells[2].occupied){
			cell = table[2].cells[2];
		}else if(table[0].cells[0].owner == who && table[2].cells[2].owner == who && !table[1].cells[1].occupied){
			cell = table[1].cells[1];
		}else if(table[2].cells[2].owner == who && table[1].cells[1].owner == who && !table[0].cells[0].occupied){
			cell = table[0].cells[0];
		}else if(table[0].cells[2].owner == who && table[2].cells[0].owner == who && !table[1].cells[1].occupied){
			cell = table[1].cells[1];
		}else if(table[2].cells[0].owner == who && table[1].cells[1].owner == who && !table[0].cells[2].occupied){
			cell = table[0].cells[2];
		}else if(table[0].cells[2].owner == who && table[1].cells[1].owner == who && !table[2].cells[0].occupied){
			cell = table[2].cells[0];
		}
	}

	return cell;
}

/*
______________________________

This Function is the second strategy used by normal computer.
It is used to check if there is possibilities of making a fork.
______________________________
*/

function checkFork(who){
	var cell = null;

	if(table[0].cells[0] == who && table[2].cells[2] == who){
		if(!table[0].cells[1].occupied && !table[0].cells[2].occupied && !table[1].cells[2].occupied){
			cell = table[0].cells[2];
		}else if(!table[1].cells[0].occupied && !table[2].cells[0].occupied && !table[2].cells[1].occupied){
			cell = table[2].cells[0];
		}
	}else if(table[0].cells[2] == who && table[2].cells[0] == who){
		if(!table[0].cells[0].occupied && !table[0].cells[1].occupied && !table[1].cells[0].occupied){
			cell = table[0].cells[0];
		}else if(!table[1].cells[2].occupied && !table[2].cells[1].occupied && !table[2].cells[2].occupied){
			cell = table[2].cells[1];
		}
	}else if(table[0].cells[0] == who && table[1].cells[1] == who){
		if(!table[0].cells[1].occupied && !table[0].cells[2].occupied && !table[2].cells[1].occupied){
			cell = table[0].cells[1];
		}else if(!table[1].cells[0].occupied && !table[2].cells[0].occupied && !table[1].cells[2].occupied){
			cell = table[1].cells[0];
		}
	}else if(table[0].cells[2] == who && table[1].cells[1] == who){
		if(!table[0].cells[1].occupied && !table[0].cells[0].occupied && !table[2].cells[1].occupied){
			cell = table[0].cells[1];
		}else if(!table[1].cells[0].occupied && !table[2].cells[2].occupied && !table[1].cells[2].occupied){
			cell = table[1].cells[2];
		}
	}else if(table[2].cells[0] == who && table[1].cells[1] == who){
		if(!table[0].cells[1].occupied && !table[2].cells[2].occupied && !table[2].cells[1].occupied){
			cell = table[2].cells[1];
		}else if(!table[1].cells[0].occupied && !table[0].cells[0].occupied && !table[1].cells[2].occupied){
			cell = table[1].cells[0];
		}
	}else if(table[2].cells[2] == who && table[1].cells[1] == who){
		if(!table[1].cells[0].occupied && !table[0].cells[2].occupied && !table[1].cells[2].occupied){
			cell = table[1].cells[2];
		}else if(!table[0].cells[1].occupied && !table[2].cells[0].occupied && !table[2].cells[1].occupied){
			cell = table[2].cells[1];
		}
	}

	return cell;
}

/*
______________________________

This Function is used to complete computer play. 
______________________________
*/
function computerPlay(){
	var cellTaken = null;

	if(sel.value == "normal"){
		cellTaken = checkWin("computer");
		if(cellTaken == null){
			cellTaken = checkWin("player");
			if(cellTaken == null){
				cellTaken = checkFork("computer");
				if(cellTaken == null){
					cellTaken = checkFork("player");
					if(cellTaken == null){
						if(!table[1].cells[1].occupied){
							cellTaken = table[1].cells[1];
						}else if(table[0].cells[0].owner == "player" && !table[2].cells[2].occupied){
							cellTaken = table[2].cells[2];	
						}else if(table[0].cells[2].owner == "player" && !table[2].cells[0].occupied){
							cellTaken = table[2].cells[0];	
						}else if(table[2].cells[0].owner == "player" && !table[0].cells[2].occupied){
							cellTaken = table[0].cells[2];	
						}else if(table[2].cells[2].owner == "player" && !table[0].cells[0].occupied){
							cellTaken = table[0].cells[0];	
						}else if(!table[2].cells[2].occupied){
							cellTaken = table[2].cells[2];	
						}else if(!table[2].cells[0].occupied){
							cellTaken = table[2].cells[0];	
						}else if(!table[0].cells[2].occupied){
							cellTaken = table[0].cells[2];	
						}else if(!table[0].cells[0].occupied){
							cellTaken = table[0].cells[0];	
						}else if(!table[2].cells[1].occupied){
							cellTaken = table[2].cells[1];	
						}else if(!table[1].cells[0].occupied){
							cellTaken = table[1].cells[0];	
						}else if(!table[1].cells[2].occupied){
							cellTaken = table[1].cells[2];	
						}else if(!table[0].cells[1].occupied){
							cellTaken = table[0].cells[1];	
						}
					}
				}
			}
		}
	}else{ // this strategy is used for easy computer setting. 
		i = 0;
		j = 0;
		while(table[i].cells[j].occupied){
			if((j+1) < table[i].cells.length){
				j++;
			}else{
				i++;
				j = 0;
			}
		}

		cellTaken = table[i].cells[j];
	}

	cellTaken.style.background = imgO;
	cellTaken.occupied = true;
	cellTaken.owner = "computer";
}


//Run this game
run();
