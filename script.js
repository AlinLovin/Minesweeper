var arrayGrid = [];
var arrayFlags = [];
var bombs;
var start;
var seconds;
var numberRows;
var numberColumns;
var goThrough;
var dash = "-";
var interval;
var currentLevel;

window.onload = function() {
	currentLevel = "easy";
	levels(currentLevel);

}

// Select level.
function levels(level) {
	removeCells();
	if (level == "easy") {
		numberRows = 9;
		numberColumns = 9;
		bombs = 10;	
	} else if (level == "medium") {
		numberRows = 16;
		numberColumns = 16;
		bombs = 40;
	} else if (level == "hard") {
		numberRows = 16;
		numberColumns = 30;
		bombs = 99;
	}

	currentLevel = level;
	lev = level;
	start = 0;
	seconds = 0;
	goThrough = -1;
	arrayGrid = new Array(numberRows);
	arrayFlags = new Array(numberRows);
	document.getElementById("gameState").innerHTML = " ";
	document.getElementById("table").style.pointerEvents = "auto";
	window.clearInterval(interval);
	createTable();
}

// Create table.
function createTable() {
	var displayBombs;
	var area = document.getElementById("table");

	for (let i = 0; i < numberRows; ++i) {
		arrayGrid[i] = new Array(numberColumns);
		arrayFlags[i] = new Array(numberColumns);
	}

	document.getElementById("table").style.gridTemplateRows = "repeat(" + numberRows + ", 30px)";
	document.getElementById("table").style.gridTemplateColumns = "repeat(" + numberColumns + ", 30px)";

	for (let row = 0; row < numberRows; ++row) {
		for (let col = 0; col < numberColumns; ++col) {
			area.innerHTML += '<div class="cell" id="' + row + dash + col + '" onclick="play('+ row +', '+ col +')" onauxclick="rightButton('+ row +', '+ col +')">&nbsp</div>';
			document.getElementById('' + row + dash + col).style.backgroundColor = "grey";
			arrayGrid[row][col] = 0;
		}
	}

	if (bombs < 10) {
		displayBombs = "00" + bombs;
	} else if (bombs >= 10) {
		displayBombs = "0" + bombs;
	}

	document.getElementById("timer").innerHTML = "000";
	document.getElementById("numberBombs").innerHTML = displayBombs;
	document.getElementById("button").innerHTML = "&#128578";
}

// Display seconds.
function stopWatch() {
	var displaySeconds;

	if (seconds < 999) {
		++seconds;
	}
	if (seconds < 10) {
		displaySeconds = "00" + seconds;
	} else if (seconds <= 99) {
		displaySeconds = "0" + seconds;
	} else {
		displaySeconds = seconds;
	}

	document.getElementById("timer").innerHTML = displaySeconds;
}

// Select div elements with right click and display bombs number.
function rightButton(row, col) {
	var displayBombs;

	document.addEventListener('contextmenu', function(event) {
		event.preventDefault();
	}, false);
	if (bombs > 0 && start == 1) {
		var cell = document.getElementById('' + row + dash + col).innerHTML;
		if (cell === "&nbsp;") {
			document.getElementById('' + row + dash + col).innerHTML = "&#128681";
			arrayFlags[row][col] = "flag";
			--bombs;
		} else if (cell != 1 && cell != 2 && cell != 3 && cell != 4 && cell != 5 && cell != 6 && cell != 7 && cell != 8) {
			document.getElementById('' + row + dash + col).innerHTML = "&nbsp;";
			arrayFlags[row][col] = "";
			++bombs;
		}
		if (bombs < 10) {
			var displayBombs = "00" + bombs;
		} else if (bombs >= 10) {
			displayBombs = "0" + bombs;
		}
		document.getElementById("numberBombs").innerHTML = displayBombs;
	}
}

// Start the timer and place the bombs.
function firstClick(firstClickRow, firstClickCol) {
	interval = window.setInterval(stopWatch, 1000);

	for (let k = 0; k < bombs; k++) {
    	var row = Math.floor(Math.random() * numberRows);
		var col = Math.floor(Math.random() * numberColumns);

		if ((row >= firstClickRow - 1 && row <= firstClickRow + 1) && (col >= firstClickCol - 1 && col <= firstClickCol + 1)) {
			--k
		} else {
			if (firstClickRow == row && firstClickCol == col) {
				--k;
			} else if (arrayGrid[row][col] == 'BOOM') {
				--k;
			} else if (arrayGrid[row][col] != 'BOOM') {
				arrayGrid[row][col] = 'BOOM'; 
			}
		}
    }
	
	// I add the helpful numbers.
	for (let rows = 0; rows < numberRows; ++rows) {
		for (let cols = 0; cols < numberColumns; ++cols) {
			var count = 0;
			if (arrayGrid[rows][cols] != "BOOM") {
				for (let i = rows - 1; i <= rows + 1; ++i) {
					for (let j = cols - 1; j <= cols + 1; ++j) {

						if ((i >= 0 && i <= numberRows - 1) && (j >= 0 && j <= numberColumns - 1)) {
							if (arrayGrid[i][j] == "BOOM") {
								++count;
							}
						}
					}
				}
				if (count == 0) {
					document.getElementById('' + rows + dash + cols).innerHTML = ' ';
				} else {
					arrayGrid[rows][cols] = count;
				}
			}

		}
	}
	discover(firstClickRow , firstClickCol);
	console.log(arrayGrid);
}

// Go through all the digits of 0 in the matrix that are related to each other.
function discover(a, b) {
	var reverseCount = -1;
	var copyA;
	var copyB;
	var ok;
	while (reverseCount < 0) {
		ok = 0;
		for (let i = a - 1; i <= a + 1; ++i) {
			for (let j = b - 1; j <= b + 1; ++j) {

				if ((i >= 0 && i < numberRows) && (j >= 0 && j < numberColumns) && (arrayGrid[i][j] == 0)) {
					discoverHelpfulNumbers(i, j);
					arrayGrid[i][j] = goThrough;
					--goThrough;
					reverseCount = goThrough;
					copyA = i;
					copyB = j;
					ok = 1;
				}
			}
		}

		if (ok == 1) {
			a = copyA;
			b = copyB;
		} else {
			reverseCount = reverseCount + 1;
			for (let i = 0; i < numberRows; ++i) {
				for (let j = 0; j < numberColumns; ++j) {

					if (arrayGrid[i][j] == reverseCount) {
						a = i;
						b = j;
					}
				}
			}
		}
	}
}

// I display each helper digit around each element in the matrix that is less than 0;
function discoverHelpfulNumbers(a, b) {
	for (let i = a - 1; i <= a + 1; ++i) {
		for (let j = b - 1; j <= b + 1; ++j) {
			if ((i >= 0 && i < numberRows) && (j >= 0 && j < numberColumns)) {
				document.getElementById('' + i + dash + j).style.backgroundColor = "white";

				if (arrayGrid[i][j] > 0) {
					document.getElementById('' + i + dash + j).innerHTML = arrayGrid[i][j];
				}
			}
		}
	}
}

function play(a, b) {
	if (start == 0) {
		firstClick(a, b);
		start = 1;
	} else {
		if (arrayGrid[a][b] === 'BOOM' && arrayFlags[a][b] !== "flag") {
			for (let i = 0; i < numberRows; ++i) {
				for (let j = 0; j < numberColumns; ++j) {
					var cell = document.getElementById('' + i + dash + j).innerHTML;

					if (arrayGrid[i][j] === 'BOOM' && cell === "&nbsp;") {
						document.getElementById('' + i + dash + j).innerHTML = "&#128163"; 
						document.getElementById('' + i + dash + j).style.backgroundColor = "red";
					}
					if (arrayGrid[i][j] !== 'BOOM' && arrayFlags[i][j] === "flag") {
						document.getElementById('' + i + dash + j).innerHTML = "&#10060"; 
					}
				}
			}

			document.getElementById("table").style.pointerEvents = "none";
			document.getElementById("gameState").style.color = "red";
			document.getElementById("gameState").innerHTML = "GAME OVER";
			document.getElementById("button").innerHTML = "&#128565";
			window.clearInterval(interval);
		} else if (arrayGrid[a][b] == 0 && arrayFlags[a][b] != "flag") {
			discover(a, b);
		} else if (arrayGrid[a][b] > 0 && arrayFlags[a][b] !== "flag") {
			document.getElementById('' + a + dash + b).innerHTML = arrayGrid[a][b];
			document.getElementById('' + a + dash + b).style.backgroundColor = "white";
		}

		// I check if the player has won.
		for (let i = 0; i < numberRows; ++i) {
			for (let j = 0; j < numberColumns; ++j) {
				var cellStyle = document.createElement('style');
				cellStyle = document.getElementById('' + i + dash + j).style.backgroundColor;

				if (arrayGrid[i][j] != 'BOOM') {
					if (cellStyle != "white") {
						return;
					}
				}
			}
		}
		document.getElementById("gameState").style.color = "green";
		document.getElementById("gameState").innerHTML = "CONGRATULATIONS! YOU WON!";
		document.getElementById("table").style.pointerEvents = "none";
		document.getElementById("button").innerHTML = "&#128526";
		window.clearInterval(interval);
	}
}

function removeCells() {
	for (let row = 0; row < numberRows; ++row) {
		for (let col = 0; col < numberColumns; ++col) {
			var obj = document.getElementById('' + row + dash + col);
			obj.remove();
		}
	}
	arrayGrid.length = 0;
	arrayFlags.length = 0;
}

// Start another game.
function newGame() {
	levels(currentLevel);
}
