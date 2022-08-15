import { getWinnersAPI, countAllWinners } from '../../api/api_winners';
import { getCarAPI } from '../../api/api_garage';
import { createWinnerUI } from '../UI/create_car';
import { DescriptionCar } from '../garage/utils_garage';

const containerWinners = <HTMLElement>document.querySelector('.container-win');
const countWinners = <HTMLElement>document.querySelector('.count-winners');

export const numberPageWinners = 1;

export const updateWinnersUI = () => {
  let CurrentPage = numberPageWinners * 10 - 10;

  getWinnersAPI(numberPageWinners).then((arr: DescriptionCar[]) => {
    containerWinners.innerHTML = '';

    arr.forEach((car) => {
      let name = '';
      let color = '';
      getCarAPI(car.id).then((oneCar) => {
        name = oneCar.name;
        color = oneCar.color;
        CurrentPage += 1;

        const oneWinner = `${createWinnerUI(CurrentPage, color, name, car.wins, car.time)}`;
        containerWinners.innerHTML += oneWinner;
      });
    });
    countWinners.textContent = `(${countAllWinners})`;
  });
};