import { createBodyUI } from './create_body';

createBodyUI();

const btnPageToGarage = <HTMLElement>document.querySelector('.btn-to_garage');
const btnPageToWinners = <HTMLElement>document.querySelector('.btn-to_winners');
const toGarage = <HTMLElement>document.querySelector('.garage-page');
const toWinners = <HTMLElement>document.querySelector('.winners-page');

btnPageToGarage.addEventListener('click', () => {
  toWinners.classList.add('hide');
  toGarage.classList.remove('hide');
});

btnPageToWinners.addEventListener('click', () => {
  toGarage.classList.add('hide');
  toWinners.classList.remove('hide');
});
