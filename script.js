class Gameboard {
    constructor() {
      this.gameboard = [];
      this.createGameCells();
      this.addEventListenersToCells();
      this.addRestartButton();
      this.startNewGame();
      this.winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      this.difficulty = "easy";
      this.aiPlayer = "O";
      this.humanPlayer = "X";
    }
  
    getGameBoard() {
      return this.gameboard;
    }
  
    startNewGame() {
      this.gameboard = ["", "", "", "", "", "", "", "", ""];
      this.updateGameboardDisplay();
    }
  
    createGameCells() {
      const gameboardDiv = document.querySelector(".gameboard");
  
      // Remove any existing game cells from the gameboard
      while (gameboardDiv.firstChild) {
        gameboardDiv.removeChild(gameboardDiv.firstChild);
      }
  
      // Create new game cells and add them to the gameboard
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("gameCell");
        cell.setAttribute("id", `cell-${i}`);
        const cellContent = document.createElement("p");
        cell.appendChild(cellContent);
        gameboardDiv.appendChild(cell);
        this.gameboard.push("");
      }
    }
  
    handleCellClick(cellIndex) {
      if (this.gameboard[cellIndex] === "") {
        const cell = document.getElementById(`cell-${cellIndex}`);
        const cellContent = cell.querySelector("p");
        cellContent.textContent = "X";
        this.gameboard[cellIndex] = "X";
        console.log(this.gameboard);
        this.checkForWinner();
        this.computerPlay();
      }
    }

    setDifficulty(difficulty) {
      this.difficulty = difficulty;
    }
  
    setAiPlayer(aiPlayer) {
      this.aiPlayer = aiPlayer;
      this.humanPlayer = aiPlayer === "O" ? "X" : "O";
    }

    computerPlay() {
      if (this.difficulty === "easy") {
        this.easyComputerPlay();
      } else if (this.difficulty === "medium") {
        this.mediumComputerPlay();
      } else if (this.difficulty === "hard") {
        this.hardComputerPlay();
      }
    }
  
    easyComputerPlay() {
      const availableCells = this.getAvailableCells();
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const cellIndex = availableCells[randomIndex];
      const cell = document.getElementById(`cell-${cellIndex}`);
      const cellContent = cell.querySelector("p");
      cellContent.textContent = this.aiPlayer;
      this.gameboard[cellIndex] = this.aiPlayer;
      console.log(this.gameboard);
      this.checkForWinner();
    }
  
    mediumComputerPlay() {
      // TODO: Implement medium AI
    }
  
    hardComputerPlay() {
      // TODO: Implement hard AI
    }
  
    getAvailableCells() {
      const availableCells = [];
      for (let i = 0; i < this.gameboard.length; i++) {
        if (this.gameboard[i] === "") {
          availableCells.push(i);
        }
      }
      return availableCells;
    }
  
    checkForWinner() {
      for (let i = 0; i < this.winningCombinations.length; i++) {
        const [a, b, c] = this.winningCombinations[i];
        if (
          this.gameboard[a] &&
          this.gameboard[a] === this.gameboard[b] &&
          this.gameboard[a] === this.gameboard[c]
        ) {
          console.log(`${this.gameboard[a]} is the winner!`);
          this.handleWinner(this.gameboard[a]);
          return;
        }
      }
    }
  
    handleWinner(winner) {
      alert(`${winner} wins!`);
      this.startNewGame(); 
    }
  
    addRestartButton() {
      const restartButton = document.createElement("button");
      restartButton.textContent = "Restart";
      restartButton.addEventListener("click", () => {
        this.startNewGame();
      });
      document.querySelector(".game-options").appendChild(restartButton);
    }
  
    addEventListenersToCells() {
      const cells = document.querySelectorAll(".gameCell");
      cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
          this.handleCellClick(index);
        });
      });
    }
  
    updateGameboardDisplay() {
      const cells = document.querySelectorAll(".gameCell");
      cells.forEach((cell, index) => {
        const cellContent = cell.querySelector("p");
        cellContent.textContent = this.gameboard[index];
      });
    }
  }
  
  const gameboard = new Gameboard();
  console.log(gameboard.getGameBoard()); // Output: ["", "", "", "", "", "", "", "", ""]
  