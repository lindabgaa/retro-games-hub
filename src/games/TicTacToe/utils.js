// Function to randomly select a player ('X' or 'O') to start the game.
export const randomPlayer = () => {
  const players = ["X", "O"];
  const randomIndex = Math.floor(Math.random() * 2);
  return players[randomIndex];
};

// Function to check for a valid winning combination on the Tic-Tac-Toe board.
// Returns the indices of the winning cells as strings (e.g., "0-0").
export const checkValidCombination = (arr, str) => {
  // check lines
  for (let i = 0; i < 3; i++) {
    if (arr[i][0] === str && arr[i][1] === str && arr[i][2] === str) {
      return [`${i}-${0}`, `${i}-${1}`, `${i}-${2}`];
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    if (arr[0][i] === str && arr[1][i] === str && arr[2][i] === str) {
      return [`${0}-${i}`, `${1}-${i}`, `${2}-${i}`];
    }
  }
  // check diagonals
  if (arr[0][0] === str && arr[1][1] === str && arr[2][2] === str) {
    return [`${0}-${0}`, `${1}-${1}`, `${2}-${2}`];
  }

  if (arr[0][2] === str && arr[1][1] === str && arr[2][0] === str) {
    return [`${0}-${2}`, `${1}-${1}`, `${2}-${0}`];
  }

  return null;
};

// Function to check if all cells on the Tic-Tac-Toe board are filled.
// Returns true if all cells are occupied, false otherwise.
export const checkAllCellsFilled = (arr) => {
  return arr.every((row) => row.every((cell) => cell !== " "));
};
