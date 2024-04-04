const boxElements = document.querySelectorAll('.singlebox');
const messagearea = document.querySelector('.message');

const updatemessage = (message) => {
	messagearea.textContent = message;

}


const gameboard = (() => {
	let board = ["", "", "", "", "", "", "", "", ""];

	const getboard = () => board;
	const updatevisualbox = () => {
		boxElements.forEach((box, index) => {
			box.textContent = board[index];
		});
	};

	const resetboard = () => {
		board = ["", "", "", "", "", "", "", "", ""];
		updatevisualbox();




	};

	const updateboard = (index, player) => {
		if (board[index] === "") {
			board[index] = player;
			updatevisualbox();
			return true;
		} else {
			return false;
		}
	};

	return { getboard, resetboard, updateboard, updatevisualbox };
})();

function player(symbol) {
	return { symbol };
}

// const getplayername = () => {
// 	const playeronename = prompt("Enter p1 name (X)");
// 	const playertwoname = prompt("Enter p2 name (O)");
// 	return [playeronename, playertwoname];
// };

const gamecontroller = (() => {

	const player1 = player("X");
	const player2 = player("O");
	let currentplayer = player1;

	const switchplayer = () => {
		currentplayer = currentplayer === player1 ? player2 : player1;
	};

	const checkwin = () => {
		const board = gameboard.getboard();
		const winarray = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < winarray.length; i++) {
			const [a, c, b] = winarray[i];
			if (!!board[a] && board[a] === board[b] && board[a] === board[c]) {
				return true;
			}
		}
		return false;
	};

	const checkdraw = () => {
		const board = gameboard.getboard();
		for (let i = 0; i < board.length; i++) {
			if (board[i] === "") {
				return false;
			}
		}
		return true;
	};


	const clickhandeler = (index) => {
		const moveresult = gameboard.updateboard(index, currentplayer.symbol);
		if (moveresult) {
			updatemessage(currentplayer.symbol + "moved to index" + index);
			if (checkwin()) {
				updatemessage(currentplayer.symbol + " WON! ");
			}
			else if (checkdraw()) {
				updatemessage("Its a TIE!");

			}
			else {
				switchplayer();

			}
		} else {
			updatemessage("This box is taken already!")
		}

	};
	const resetgame = () => {
		gameboard.resetboard();
		currentplayer = player1;
	};

	return {
		resetgame,
		clickhandeler,
		checkdraw,
		checkwin
	};
})();



const startnewgame = () => {
	updatemessage("")
	gamecontroller.resetgame()
	gameboard.updatevisualbox();
};



boxElements.forEach((box, index) => {

	box.addEventListener("click", () => {

		if (!gamecontroller.checkwin() && !gamecontroller.checkdraw()) {
			gamecontroller.clickhandeler(index);

		}


	});

});


const startbutton = document.querySelector('.button');
startbutton.addEventListener("click", startnewgame)

startnewgame();

