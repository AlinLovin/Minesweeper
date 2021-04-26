var bombs = 10;
var start = 0;
var seconds = 0;
var numberRows = 9;
var numberColumns = 9;
var arrayGrid = new Array(numberRows);
var arrayFlags = new Array(numberRows);

// Create table.
window.onload = function() {
	var displayBombs;
	var area = document.getElementById("table");

	for (let i = 0; i < numberColumns; ++i) {
		arrayGrid[i] = new Array(numberColumns);
		arrayFlags[i] = new Array(numberColumns);
	}

	document.getElementById("table").style.gridTemplateRows = "repeat(" + numberRows + ", 30px)";
	document.getElementById("table").style.gridTemplateColumns = "repeat(" + numberColumns + ", 30px)";

	for (let row = 0; row < numberRows; ++row) {
		for (let col = 0; col < numberColumns; ++col) {
			area.innerHTML += '<div class="cell" id="' + row + col + '" onclick="play('+ row +', '+ col +')" onauxclick="rightButton('+ row +', '+ col +')">&nbsp</div>';
			document.getElementById('' + row + col).style.backgroundColor = "grey";
			arrayGrid[row][col] = 0;

		}
	}

	if (bombs < 10) {
		displayBombs = "00" + bombs;
	} else if (bombs >= 10) {
		displayBombs = "0" + bombs;
	}

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

	if (bombs > 0) {
		var cell = document.getElementById('' + row + col).innerHTML;
		if (cell === "&nbsp;") {
			document.getElementById('' + row + col).innerHTML = "&#128681";
			arrayFlags[row][col] = "flag";
			--bombs;
		} else if (cell != 1 && cell != 2 && cell != 3 && cell != 4 && cell != 5 && cell != 6 && cell != 7 && cell != 8) {
			document.getElementById('' + row + col).innerHTML = "&nbsp;";
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
		var ok = 0;

		// I check if the first selected div element will have a bomb next to it.
		if (firstClickCol + 1 < numberColumns) {
			if (firstClickCol + 1 == col && firstClickRow == row) {
				++ok;		
			}
		}

		if (firstClickRow + 1 < numberRows && firstClickCol + 1 < numberColumns) {
			if (firstClickRow + 1 == row && firstClickCol + 1 == col) {
				++ok;
			}
		}

		if (firstClickRow + 1 < numberRows) {
			if (firstClickRow + 1 == row && firstClickCol == col) {
				++ok;
			}
		}

		if (firstClickRow + 1 < numberRows && firstClickCol - 1 >= 0) {
			if (firstClickRow + 1 == row && firstClickCol - 1 == col) {
				++ok;
			}
		}

		if (firstClickCol - 1 >= 0) {
			if (firstClickCol - 1 == col && firstClickRow == row) {
				++ok;
			}
		}

		if (firstClickRow - 1 >= 0 && firstClickCol - 1 >= 0) {
			if (firstClickRow - 1 == row && firstClickCol - 1 == col) {
				++ok;
			}
		}

		if (firstClickRow - 1 >= 0) {
			if (firstClickRow - 1 == row && firstClickCol == col) {
				++ok;
			}
		}

		if (firstClickRow - 1 >= 0 && firstClickCol + 1 < numberColumns) {
			if (firstClickRow - 1 == row && firstClickCol + 1 == col) {
				++ok;
			}
		}

		// I place a bomb on a div element if there is no bomb near the first selected div item.
		// I place a bomb on a div other than the first one selected and on one where it doesn't already exist.
		if (ok == 0) {
			if (firstClickRow == row && firstClickCol == col) {
				--k;
			} else if (arrayGrid[row][col] == 'BOOM') {
				--k;
			} else if (arrayGrid[row][col] != 'BOOM') {
				arrayGrid[row][col] = 'BOOM'; 
			}
		} else {
			--k;
		}
    }
	
	// I add the helpful numbers.
	for (let i = 0; i < numberRows; ++i) {
		for (let j = 0; j < numberColumns; ++j) {
			var count = 0;
			if (arrayGrid[i][j] !== 'BOOM') {
				if (j + 1 < numberColumns) {
					if (arrayGrid[i][j + 1] === 'BOOM') {
						++count;
					}
				}

				if (i + 1 < numberRows && j + 1 < numberColumns) {
					if (arrayGrid[i + 1][j + 1] === 'BOOM') {
						++count;
					}
				}

				if (i + 1 < numberRows) {
					if (arrayGrid[i + 1][j] === 'BOOM') {
						++count;
					}
				}

				if (i + 1 < numberRows && j - 1 >= 0) {
					if (arrayGrid[i + 1][j - 1] === 'BOOM') {
						++count;
					}
				}

				if (j - 1 >= 0) {
					if (arrayGrid[i][j - 1] === 'BOOM') {
						++count;
					}
				}

				if (i - 1 >= 0 && j - 1 >= 0) {
					if (arrayGrid[i - 1][j - 1] === 'BOOM') {
						++count;
					}
				}

				if (i - 1 >= 0) {
					if (arrayGrid[i - 1][j] === 'BOOM') {
						++count;
					}
				}

				if (i - 1 >= 0 && j + 1 < numberColumns) {
					if (arrayGrid[i - 1][j + 1] === 'BOOM') {
						++count;
					}
				}
				arrayGrid[i][j] = count;
				if (count === 0) {
					document.getElementById('' + i + j).innerHTML = ' ';
				}
			}
		}
	}
	discover(firstClickRow , firstClickCol);
}

// Go through all the digits of 0 in the matrix that are related to each other.
function discover(a, b) {
	var count = -1;
	var reverseCount = 0;

	while (reverseCount < 1) {
		dicoverHelpfulNumbers(a, b);
		if ((a - 1 >= 0) && (arrayGrid[a - 1][b] == 0)) {
			arrayGrid[a - 1][b] = count;
			--count;
			a = a - 1;
			reverseCount = count;
		} else if ((a - 1 >= 0 && b + 1 < numberColumns) && (arrayGrid[a - 1][b + 1] == 0)) {
			arrayGrid[a - 1][b + 1] = count;
			--count;
			a = a - 1;
			b = b + 1;
			reverseCount = count;
		} else if ((b + 1 < numberColumns) && (arrayGrid[a][b + 1] == 0)) {
			arrayGrid[a][b + 1] = count;	
			--count;
			b = b + 1;
			reverseCount = count;		
		} else if ((a + 1 < numberRows && b + 1 < numberColumns) && (arrayGrid[a + 1][b + 1] == 0)) {
			arrayGrid[a + 1][b + 1] = count;
			--count;
			a = a + 1;
			b = b + 1;
			reverseCount = count;
		} else if ((a + 1 < numberRows) && (arrayGrid[a + 1][b] == 0)) {
			arrayGrid[a + 1][b] = count;
			--count;
			a = a + 1;
			reverseCount = count;
		} else if ((a + 1 < numberRows && b - 1 >= 0) && (arrayGrid[a + 1][b - 1] == 0)) {
			arrayGrid[a + 1][b - 1] = count;
			--count;
			a = a + 1;
			b = b - 1;
			reverseCount = count;
		} else if ((b - 1 >= 0) && (arrayGrid[a][b - 1] == 0)) {
			arrayGrid[a][b - 1] = count;
			--count;
			b = b - 1;
			reverseCount = count;
		} else if ((a - 1 >= 0 && b - 1 >= 0) && (arrayGrid[a - 1][b - 1] == 0)) {
			arrayGrid[a - 1][b - 1] = count;
			--count;
			a = a - 1;
			b = b - 1;
			reverseCount = count;
		} else {
			reverseCount += 1;
			if (reverseCount < 0) {
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
}

// I display each helper digit around each element in the matrix that is less than 0;
function dicoverHelpfulNumbers(a, b) {
	var row = a;
	var col = b;
	document.getElementById('' + row + col).style.backgroundColor = "white";

	if (arrayGrid[row][col] > 0) {
		document.getElementById('' + row + col).innerHTML = arrayGrid[row][col];
	}

	if (b + 1 < numberColumns) {
		row = a;
		col = b + 1;
		document.getElementById('' + row + col).style.backgroundColor = "white";
	}
	if (arrayGrid[row][col] > 0) {
		document.getElementById('' + row + col).innerHTML = arrayGrid[row][col];
	}

	if (a + 1 < numberRows && b + 1 < numberColumns) {
		row = a + 1;
		col = b + 1;
		document.getElementById('' + row + col).style.backgroundColor = "white";
	}
	if (arrayGrid[row][col] > 0) {
		document.getElementById('' + row + col).innerHTML = arrayGrid[row][col];
	}

	if (a + 1 < numberRows) {
		row = a + 1;
		col = b;
		document.getElementById('' + row + col).style.backgroundColor = "white";
	}
	if (arrayGrid[row][col] > 0) {
		document.getElementById('' + row + col).innerHTML = arrayGrid[row][col];
	}

	if (a + 1 < numberRows && b - 1 >= 0) {
		row = a + 1;
		col = b - 1;
		document.getElementById('' + row + col).style.backgroundColor = "white";
	}
	if (arrayGrid[row][col] > 0) {
		document.getElementById('' + row + col).innerHTML = arrayGrid[row][col];
	}

	if (b - 1 >= 0) {
		row = a;
		col = b - 1;
		document.getElementById('' + row + col).style.backgroundColor = "white";
	}
	if (arrayGrid[row][col] > 0) {
		document.getElementById('' + row + col).innerHTML = arrayGrid[row][col];
	}

	if (a - 1 >= 0 && b - 1 >= 0) {
		row = a - 1;
		col = b - 1;
		document.getElementById('' + row + col).style.backgroundColor = "white";
	}
	if (arrayGrid[row][col] > 0) {
		document.getElementById('' + row + col).innerHTML = arrayGrid[row][col];
	}

	if (a - 1 >= 0) {
		row = a - 1;
		col = b;
		document.getElementById('' + row + col).style.backgroundColor = "white";
	}
	if (arrayGrid[row][col] > 0) {
		document.getElementById('' + row + col).innerHTML = arrayGrid[row][col];
	}

	if (a - 1 >= 0 && b + 1 < numberColumns) {
		row = a - 1;
		col = b + 1;
		document.getElementById('' + row + col).style.backgroundColor = "white";
	}
	if (arrayGrid[row][col] > 0) {
		document.getElementById('' + row + col).innerHTML = arrayGrid[row][col];
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
					var cell = document.getElementById('' + i + j).innerHTML;
					if (arrayGrid[i][j] === 'BOOM' && cell === "&nbsp;") {
						document.getElementById('' + i + j).innerHTML = "&#128163"; 
						document.getElementById('' + i + j).style.backgroundColor = "red";
					}
				}
			}
			document.getElementById("table").style.pointerEvents = "none";
			document.getElementById("gameState").style.color = "red";
			document.getElementById("gameState").innerHTML = "GAME OVER";
			document.getElementById("button").innerHTML = "&#128565";
			window.clearInterval(interval);
		} else if (arrayGrid[a][b] === 0 && arrayFlags[a][b] !== "flag") {
			discover(a, b);
		} else if (arrayGrid[a][b] > 0 && arrayFlags[a][b] !== "flag") {
			document.getElementById('' + a + b).innerHTML = arrayGrid[a][b];
			document.getElementById('' + a + b).style.backgroundColor = "white";
		}

		// I check if the player has won.
		for (let i = 0; i < numberRows; ++i) {
			for (let j = 0; j < numberColumns; ++j) {
				var cellStyle = document.createElement('style');
				cellStyle = document.getElementById('' + i + j).style.backgroundColor;
				if (arrayGrid[i][j] != 'BOOM') {
					if (cellStyle != "white") {
						return;
					}
				}
			}
		}
		document.getElementById("gameState").style.color = "green";
		document.getElementById("gameState").innerHTML = "CONGRATULATIONS! YOU WIN!";
		document.getElementById("table").style.pointerEvents = "none";
		document.getElementById("button").innerHTML = "&#128526";
		window.clearInterval(interval);
	}
}

// Start another game.
function restartPage() {
	location.reload();
}
