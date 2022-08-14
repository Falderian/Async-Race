import { countAllCars, getCarsAPI, getCarAPI, createCarAPI, deleteCarAPI, updateCarAPI } from '../../api/api_garage';
import { createCarUI } from '../UI/create_car';
import { getRandomName, getRandomColor, DescriptionCar } from './utils_garage';
import { getAllWinnersAPI, deleteWinnerAPI } from '../../api/api_winners';

import { resetRace } from './drive_car';
import { updateWinnersUI } from '../winners/update_winners';

const btnPrevCars = <HTMLButtonElement>document.querySelector('.btn-prev');
const btnNextCars = <HTMLButtonElement>document.querySelector('.btn-next');
const numPage = <HTMLSpanElement>document.querySelector('.count-page');
const generateNewCarBtn = <HTMLElement>document.querySelector('.generate-cars');
const btnGenerateCards = <HTMLElement>document.querySelector('.btn-generate_cars');
const containerCar = <HTMLElement>document.querySelector('.container-car');
const countGarage = <HTMLElement>document.querySelector('.count-garage');
const inputTextCreate = <HTMLInputElement>document.querySelector('.text-create');
const inputColorCreate = <HTMLInputElement>document.querySelector('.color-create');


const inputTextUpdate = <HTMLInputElement>document.querySelector('.text-update');
const inputColorUpdate = <HTMLInputElement>document.querySelector('.color-update');
const btnUpdate = <HTMLInputElement>document.querySelector('.btn-update');

let idUpdateCar: number;
export let numberPage = 1;
const MAX_CARS_PER_PAGE = 7;
const GENER_100_CARS = 100;
//car_update
export const updateCarsUI = () => {
  getCarsAPI(numberPage).then((arr: DescriptionCar[]) => {
    containerCar.innerHTML = '';
    arr.forEach((car) => {
      const oneCar = `${createCarUI(car.id, car.name, car.color)}`;
      containerCar.innerHTML += oneCar;
    });
    countGarage.textContent = `(${countAllCars})`;
  });
};
updateCarsUI();

//switch_pages
btnPrevCars.addEventListener('click', () => {
  if (numberPage === 1) {
    btnPrevCars.setAttribute('disabled', 'disabled');
  } else {
    btnNextCars.removeAttribute('disabled');
      numberPage -= 1;
      numPage.textContent = `${numberPage}`;
  }
  updateCarsUI();
  resetRace();
});

btnNextCars.addEventListener('click', () => {
  if (numberPage * MAX_CARS_PER_PAGE >= countAllCars) {
    btnNextCars.setAttribute('disabled', 'disabled');
  } else {
    btnPrevCars.removeAttribute('disabled');
    numberPage += 1;
    numPage.textContent = `${numberPage}`;
  }
  updateCarsUI();
  resetRace();
});


//delete or init existing car
document.addEventListener('click', async (e) => {
  const btn = e.target as HTMLElement;

  if (btn.classList.contains('car-options_select')) {
    idUpdateCar = Number(btn.dataset.select);
    inputTextUpdate.disabled = false;
    inputColorUpdate.disabled = false;
    btnUpdate.disabled = false;

    getCarAPI(idUpdateCar).then((item) => {
      inputTextUpdate.value = item.name;
      inputColorUpdate.value = item.color;
    });
  }

  if (btn.classList.contains('car-options_remove')) {
    const idButton = Number(btn.dataset.remove);
    deleteCarAPI(idButton).then(() => updateCarsUI());

    getAllWinnersAPI().then((arrAllWin) => {
      arrAllWin.forEach((item: DescriptionCar) => {
        if (Number(item.id) === idButton) deleteWinnerAPI(idButton);
      });
    }).then(() => updateWinnersUI());
  }
});


//create or update existing car
generateNewCarBtn.addEventListener('click', (e) => {
  const elem = e.target as HTMLElement;

  if (elem.classList.contains('btn-create')) {
    const nameNewCar =  inputTextCreate.value;
    const colorNewCar =  inputColorCreate.value;

    if (nameNewCar == '') {
      alert('Please, enter name car!');
    } else {
      (createCarAPI({ 'name': nameNewCar, 'color': colorNewCar })).then(() => updateCarsUI());
    }

    if (countAllCars % MAX_CARS_PER_PAGE === 0) btnNextCars.removeAttribute('disabled');
    inputTextCreate.value = '';
  }

  if (elem.classList.contains('btn-update')) {
    const nameUpdateCar =  inputTextUpdate.value;
    const colorUpdateCar =  inputColorUpdate.value;
    
    (updateCarAPI( { 'name': nameUpdateCar, 'color': colorUpdateCar }, idUpdateCar)).then(() => updateCarsUI() );
    
    inputTextUpdate.value = '';
    inputTextUpdate.disabled = true;
    inputColorUpdate.disabled = true;
    btnUpdate.disabled = true;
  }
});

//generate cars
btnGenerateCards.addEventListener('click', async () => {
  for (let i = 0; i < GENER_100_CARS; i++){
    const name = getRandomName();
    const color = getRandomColor();
  
    createCarAPI({ 'name': `${name}`, 'color': `${color}` });
  }
  updateCarsUI();
  btnNextCars.removeAttribute('disabled');
});