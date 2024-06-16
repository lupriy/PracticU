type Params = {
  words: string[]; //массив из 3 элементов, пример: [час, часа, часов]
  number?: number;
};

export const getWordFromNumber = ({ words, number = 0 }: Params) => {
  const value = Math.abs(number) % 100;
  const secondValue = value % 10;

  if (value > 10 && value < 20) return words[2];
  else if (secondValue > 1 && secondValue < 5) return words[1];
  else if (secondValue === 1) return words[0];
  return words[2];
};
