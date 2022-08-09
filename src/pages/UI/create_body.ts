import { garagePage } from './garage_html';
import { winnersPage } from './winners_html';

export const createBodyUI = async () => {
  const html = `
    <header class="header">
      <div class="nav">
        <button class="buttons btn-to_garage">To garage</button>
        <button class="buttons btn-to_winners">To winners</button>
      </div>
    </header>
    ${garagePage}
    ${winnersPage}
    <footer>
      <div class="link-github">
        <a href="https://github.com/Falderian">GitHub: Falderian</a>
      </div>
      <div class="year-create">&#9400; 2022</div>
      <div class="link-school">
        <a href="https://rs.school/js/">
          <div class="img-rss"></div>
        </a>
      </div>
    </footer>
  `;
  const root = document.createElement('div');
  root.innerHTML = html;
  document.body.appendChild(root);
};