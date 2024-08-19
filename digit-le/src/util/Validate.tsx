export const vaildNumber: (input: string) => boolean = (input): boolean => {
  return input.match(/[^0-9]/) ? false : true;
};
