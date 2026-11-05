const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
}

menuButton.closest('.nav-wrap').classList.add('is-collapsible');
menuButton.addEventListener('click', () => setMenuOpen(!navigation.classList.contains('is-open')));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenuOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

const filterGroup = document.querySelector('.filters');
const filters = [...filterGroup.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.card[data-sector]')];
const filterStatus = document.querySelector('#filter-status');

function showSector(sector) {
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === sector)));
  cards.forEach(card => {
    card.hidden = sector !== 'all' && !card.dataset.sector.split(' ').includes(sector);
  });
  const count = cards.filter(card => !card.hidden).length;
  filterStatus.textContent = 'Showing ' + count + (count === 1 ? ' solution.' : ' solutions.');
}

filterGroup.hidden = false;
filters.forEach(button => button.addEventListener('click', () => showSector(button.dataset.filter)));
document.querySelectorAll('[data-select]').forEach(link => {
  link.addEventListener('click', () => showSector(link.dataset.select));
});

const quote = document.querySelector('#quote-form');
const interest = document.querySelector('#interest');
quote.hidden = false;
document.querySelectorAll('[data-interest]').forEach(link => {
  link.addEventListener('click', () => { interest.value = link.dataset.interest; });
});

quote.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(quote);
  const subject = 'Quote request: ' + data.get('interest').trim();
  const body = [
    'Hello Samfar Technologies,',
    '',
    'I would like to enquire about ' + data.get('interest').trim() + '.',
    '',
    data.get('requirements').trim(),
    '',
    'Name or company: ' + data.get('customer').trim()
  ].join('\r\n');
  document.querySelector('#quote-status').hidden = false;
  window.location.href = 'mailto:aquajewel786@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
