export const garagePage: string= `<div class="page garage-page">
  <div class="generate-cars">
    <div class="field-create">
      <input class="generate-input_text text-create" type="text" autocomplete placeholder="Enter name сar...">
      <input class="generate-input_color color-create" type="color">
      <button class="buttons btn-create">create</button>
    </div>
    <div class="field-update">
      <input class="generate-input_text text-update" type="text" autocomplete disabled="true" placeholder="Enter new name сar...">
      <input class="generate-input_color color-update" type="color" disabled="true">
      <button class="buttons btn-update" disabled="true">update</button>
    </div>
    <div class="field-control">
      <button class="buttons btn-race">race</button>
      <button class="buttons btn-reset" disabled>reset</button>
      <button class="buttons btn-generate_cars">generate cars</button>
    </div>
  </div>

  <div class="container-garage">
    <h1 class="title">Garage <span class="count-garage"></span></h1>
    <h3 class="title">Page #<span class="count-page">1</span></h3>

    <div class="container-car"></div>
  </div>

  <div class="pagination">
    <button class="buttons btn-prev">Prev</button>
    <button class="buttons btn-next">Next</button>
  </div>

  <div class="winner-notice"></div>

</div>
`;