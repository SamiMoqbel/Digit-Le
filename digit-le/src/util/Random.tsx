export const generateRandomDigits = (length: number) => {
  return String(Math.floor(Math.random() * 10 ** length)).padStart(length, "0");
};
