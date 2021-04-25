export const stringToColor = (string: string) => {
  let hash = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};

export const generateInitial = (string: string) => {
  if (string.length > 1) {
    const arr = string.split(' ');
    if (arr.length > 1) {
      return arr[0].substr(0, 1) + arr[1].substr(0, 1);
    } else {
      return string.substr(0, 2);
    }
  } else {
    return string;
  }
};
