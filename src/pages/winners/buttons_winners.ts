import { countAllWinners } from './api_winners';
import { updateWinnersUI } from './update_winners';
export let numberPageWinners = 1;

const btnPrevWinners = <HTMLButtonElement>document.querySelector('.btn-prev-win');
const btnNextWinners = <HTMLButtonElement>document.querySelector('.btn-next-win');
const numPageWinners = <HTMLElement>document.querySelector('.count-page_winners');

updateWinnersUI();

btnPrevWinners.addEventListener('click', () => {
  if (numberPageWinners === 1) {
    btnPrevWinners.setAttribute('disabled', 'disabled');
  } else {
    btnNextWinners.removeAttribute('disabled');
    numberPageWinners -= 1;
    numPageWinners.textContent = `${numberPageWinners}`;
  }
  updateWinnersUI();
});

btnNextWinners.addEventListener('click', () => {
  if (numberPageWinners * 10 >= countAllWinners) {
    btnNextWinners.setAttribute('disabled', 'disabled');
  } else {
    btnPrevWinners.removeAttribute('disabled');
    numberPageWinners += 1;
    numPageWinners.textContent = `${numberPageWinners}`;
  }
  updateWinnersUI();
});
