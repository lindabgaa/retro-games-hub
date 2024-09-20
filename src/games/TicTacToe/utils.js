export const randomPlayer = () => {
  const players = ["X", "O"];
  const randomIndex = Math.floor(Math.random() * 2);
  return players[randomIndex];
};

export const checkValidCombination = (arr, str) => {
  return (
    // check lines
    (arr[0][0] === str && arr[0][1] === str && arr[0][2] === str) ||
    (arr[1][0] === str && arr[1][1] === str && arr[1][2] === str) ||
    (arr[2][0] === str && arr[2][1] === str && arr[2][2] === str) ||
    // check columns
    (arr[0][0] === str && arr[1][0] === str && arr[2][0] === str) ||
    (arr[0][1] === str && arr[1][1] === str && arr[2][1] === str) ||
    (arr[0][2] === str && arr[1][2] === str && arr[2][2] === str) ||
    // check diagonals
    (arr[0][0] === str && arr[1][1] === str && arr[2][2] === str) ||
    (arr[0][2] === str && arr[1][1] === str && arr[2][0] === str)
  );
};

export const checkAllCellsFilled = (arr) => {
  return arr.every((row) => row.every((cell) => cell !== " "));
};
