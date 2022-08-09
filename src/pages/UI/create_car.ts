import { createImageCarUI } from './create_image_car';

export const createCarUI = (id: number, name: string, color: string) =>
  `<div class="car">
    <div class="car-options">
      <button class="buttons car-options_select" data-select=${id}>Select</button>
      <button class="buttons car-options_remove" data-remove=${id}>Remove</button>
      <h4 class="car-options_title">${name}</h4>
    </div>
    <div class="car-control">
      <button class="car-control_start" id="start-${id}" data-start=${id} >Start</button>
      <button class="car-control_stop" id="stop-${id}" data-stop=${id} disabled="true">Stop</button>
      <div class="car-img" id="car-${id}" data-car=${id}>${createImageCarUI(color)}</div>
      <div class="flag"></div>
    </div>
  </div>
`;

export const createWinnerUI = ( num: number, color: string, name: string, wins: number, bestTime: number) =>
  `<tr">
    <td>${num}</td>
    <td>${createImageCarUI(color)}</td>
    <td>${name}</td>
    <td>${wins}</td>
    <td>${bestTime}</td>
  </tr>
`;
