const MAX_NUMBER = 10;

type Params = { date: string };

export const formatTime = ({ date }: Params) => {
  const dateJS = new Date(date);
  const hours = dateJS.getHours();
  const minutes = dateJS.getMinutes();
  const formattedHours = hours < MAX_NUMBER ? `0${hours}` : hours;
  const formattedMinutes = minutes < MAX_NUMBER ? `0${minutes}` : minutes;

  const time = `${formattedHours}:${formattedMinutes}`;

  return { time };
};
