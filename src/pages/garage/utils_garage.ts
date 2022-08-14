import { brands, models } from './brands_models_cars';
const MAX_CARS_PER_PAGE = 7;
export const getRandomName =  () => {
  const randomNumBrand = Math.floor(Math.random() * 50);
  const randomNumModel = Math.floor(Math.random() * 50);

  return brands[randomNumBrand] + ' ' + models[randomNumModel];
};

export const getRandomColor =  () => {
  const arrColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let randomColor = '';
  for (let i = 1; i < MAX_CARS_PER_PAGE; i++ ) {
    const randomNum = Math.floor(Math.random() * arrColors.length);
    randomColor += arrColors[randomNum];
  }
  return `#${randomColor}`;
};

export type DescriptionCar = {
  [key: string | number]: number | string,
  id: number,
  name: string,
  color: string,
  wins: number,
  time: number
};

