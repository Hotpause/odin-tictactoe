const boxElements = document.querySelectorAll(".singlebox");
const messagearea = document.querySelector(".message");

const updatemessage = (message) => {
  messagearea.textContent = message;
};

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
      const [a, b, c] = winarray[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const checkdraw = () => {
    const board = gameboard.getboard();
    return board.every((cell) => cell !== "");
  };

  const clickhandeler = (index) => {
    const moveresult = gameboard.updateboard(index, currentplayer.symbol);
    if (moveresult) {
      if (checkwin()) {
        updatemessage(currentplayer.symbol + " WON!");
        return;
      } else if (checkdraw()) {
        updatemessage("It's a TIE!");
        return;
      } else {
        switchplayer();
        updatemessage(currentplayer.symbol + "'s turn");
      }
    } else {
      updatemessage("This box is already taken!");
    }
  };

  const resetgame = () => {
    gameboard.resetboard();
    currentplayer = player1;
    updatemessage(currentplayer.symbol + "'s turn");
  };

  return {
    resetgame,
    clickhandeler,
    checkdraw,
    checkwin,
  };
})();

const startnewgame = () => {
  gamecontroller.resetgame();
};

boxElements.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (!gamecontroller.checkwin() && !gamecontroller.checkdraw()) {
      gamecontroller.clickhandeler(index);
    }
  });
});

const startbutton = document.querySelector(".button");
startbutton.addEventListener("click", startnewgame);

startnewgame();
