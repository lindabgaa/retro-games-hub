export const randomPlayer = () => {
  const players = ["X", "O"];
  const randomIndex = Math.floor(Math.random() * 2);
  return players[randomIndex];
};
