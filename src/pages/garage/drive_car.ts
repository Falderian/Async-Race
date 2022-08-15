import { getCarsAPI,  getCarAPI } from '../../api/api_garage';
import { createWinnerAPI, getAllWinnersAPI, updateWinnerAPI } from '../../api/api_winners';
import { numberPage } from './listeners_for_buttons';
import { DescriptionCar } from './utils_garage';
import { updateWinnersUI } from '../winners/update_winners';
import { driveEngineAPI, startEngineAPI, stopEngineAPI } from '../../api/api_engine';

const btnResetRace = <HTMLButtonElement>document.querySelector('.btn-reset');
const btnRace = <HTMLButtonElement>document.querySelector('.btn-race');
const infoAnimation: { [id: number] : DescriptionCar; } = {};
const noticeWinner = <HTMLElement>document.querySelector('.winner-notice');
const containerRace = <HTMLElement>document.querySelector('.field-control');
const btnStartRave = <HTMLButtonElement>document.querySelector('.btn-race');
const btnStopRace = <HTMLButtonElement>document.querySelector('.btn-reset');
let time: number; 
let resultRace: HTMLElement[] = [];
const PERCENT_FROM_SCREEN = 15; 
//add winner
function addWinner(carWinner: HTMLElement, timeWinner: number): void {
  const idWinner = Number(carWinner.dataset.car);
  let timeWin = (timeWinner / 1000).toFixed(2);
  let wins = 1;
  let nameWinner;
  getCarAPI(idWinner).then((arr) => {
    nameWinner = arr.name;
    noticeWinner.innerHTML = `${nameWinner} went first (${timeWin}s) !`;
  });

  getAllWinnersAPI().then((arrAllWin: DescriptionCar[]) => {
    arrAllWin.forEach((item) => {
      if (Number(item.id) === idWinner) {
        wins = item.wins + 1;
        timeWin = (Number(item.time) < Number(timeWin) ? item.time : timeWin).toString();
      }
    });
    }).then(() => {
      if (wins > 1) {
        updateWinnerAPI({ 'wins': wins, 'time': timeWin }, idWinner);
      } else {
        createWinnerAPI({ 'id': idWinner, 'wins': wins, 'time': timeWin });
      }
    }).then(() => updateWinnersUI());
}

//animation
function animationCar(car: HTMLElement, distance: number, duration: number): DescriptionCar {
  let startTime = 0;
  const idAnime = <DescriptionCar>{};
  
  function step(timestamp: number) {
    if (!startTime) {
      startTime = timestamp;
    }
    const progress = (timestamp - startTime) / duration;
    const translate: number = progress * distance; 
    car.style.transform = `translateX(${translate}px)`;
    
    if (progress < 1) {
        idAnime.id = window.requestAnimationFrame(step);
    }
    if (progress >= 1 && !btnResetRace.hasAttribute('disabled')) {
      if (resultRace.length === 0) addWinner(car, duration);
      resultRace.push(car);
    }
  }
  idAnime.id = window.requestAnimationFrame(step);
  return idAnime;
}

const startCar = async (idCar: number): Promise<void> => {
  startEngineAPI(idCar).then((obj) => {
    const velocity = Number(obj.velocity);
    const distance = Number(obj.distance);
    time = distance / velocity;

    const car = <HTMLElement>document.getElementById(`car-${idCar}`);
    const screenWidth = document.body.clientWidth;
    const positionCar = screenWidth / 100 * PERCENT_FROM_SCREEN;
    const distanceAnimation = screenWidth - positionCar;

    infoAnimation[idCar] = animationCar(car, distanceAnimation, time);

    driveEngineAPI(idCar).then((drive) => {
      if (!drive.success) {
        window.cancelAnimationFrame(infoAnimation[idCar].id);
      }
    });
  });
};

export const stopCar = async (idStop: number): Promise<void> => {
  stopEngineAPI(idStop).then(() => {
    window.cancelAnimationFrame(infoAnimation[idStop].id);
    const car = <HTMLElement>document.getElementById(`car-${idStop}`);
    car.style.transform = 'translateX(0px)';
  });
};

const startRaceCars = async (page: number): Promise<void> => {
  getCarsAPI(page, 7).then((arrCars: DescriptionCar[]) => 
  arrCars.forEach((elem) => startCar(elem.id)));
};

export const stopRaceCars = async (page: number): Promise<void> => {
  getCarsAPI(page, 7).then((arrCars: DescriptionCar[]) => {
   arrCars.forEach((elem) => stopCar(elem.id));
  });
  resultRace = [];
  noticeWinner.innerHTML = '';
};

export function resetRace(): void {
  if (!btnResetRace.hasAttribute('disabled')) {
    btnResetRace.setAttribute('disabled', 'disabled');
    btnRace.removeAttribute('disabled');
    resultRace = [];
    noticeWinner.innerHTML = '';
  }
}

        // EVENTS
document.addEventListener('click', async (e) => {
  const btn = e.target as HTMLElement;

  if (btn.classList.contains('car-control_start')) {
    const idCar = Number(btn.dataset.start);
    startCar(idCar);
    const btnStart = <HTMLButtonElement>document.getElementById(`start-${idCar}`);
    const btnStop = <HTMLButtonElement>document.getElementById(`stop-${idCar}`);
    btnStart.setAttribute('disabled', 'disabled');
    btnStop.removeAttribute('disabled');
  }

  if (btn.classList.contains('car-control_stop')) {
    const idCar = Number(btn.dataset.stop);
    stopCar(idCar);
    const btnStart = <HTMLButtonElement>document.getElementById(`start-${idCar}`);
    const btnStop = <HTMLButtonElement>document.getElementById(`stop-${idCar}`);
    btnStop.setAttribute('disabled', 'disabled');
    btnStart.removeAttribute('disabled');
  }
});

containerRace.addEventListener('click', async (e) => {
  const btn = e.target as HTMLElement;

  if (btn.classList.contains('btn-race')) {
    startRaceCars(numberPage);
    btnStartRave.setAttribute('disabled', 'disabled');
    btnStopRace.removeAttribute('disabled');
  }

  if (btn.classList.contains('btn-reset')) {
    stopRaceCars(numberPage);
    btnStopRace.setAttribute('disabled', 'disabled');
    btnStartRave.removeAttribute('disabled');
  }
});
