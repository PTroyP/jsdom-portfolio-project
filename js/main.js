const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/*Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector('#search');

/* Portfolio Card */
// const portfolioGrid = document.querySelector('.portfolio-grid');

// const portfolioArray = [
//   ['web', './assets/images/portfolio-1.jpg', 'Web Development', 'Food Website'],
//   [
//     'web',
//     './assets/images/portfolio-2.jpg',
//     'Web Development',
//     'Skate Website',
//   ],
//   [
//     'web',
//     './assets/images/portfolio-3.jpg',
//     'Web Development',
//     'Eating Website',
//   ],
//   ['ui', './assets/images/portfolio-4a.png', 'UI Design', 'Cool Design'],
//   ['app', './assets/images/portfolio-5.jpg', 'App Development', 'Game App'],
//   ['app', './assets/images/portfolio-6.jpg', 'App Development', 'Gambling App'],
//   ['app', './assets/images/portfolio-7.jpg', 'App Development', 'Money App'],
//   ['ui', './assets/images/portfolio-8.jpg', 'UI Design', 'Fantastic Design'],
// ];

// portfolioArray.forEach((card) => {
//   const createCard = function (dataArray) {
//     const portfolioCard = document.createElement('div');
//     portfolioCard.classList.add('portfolio-card');

//     portfolioCard.dataset.item = card[0];
//     portfolioCard.innerHTML = `
//     <div class="card-body">
//       <img src="${card[1]}" alt="portfolio icon"/>
//       <a href="#" class="card-popup-box">
//       <div>${card[2]}</div>
//       <h3>${card[3]}</h3>
//       </a>
//     </div> `;

//     portfolioGrid.append(portfolioCard);
//   };
//   createCard(portfolioArray);
// });

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });

  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener('click', function () {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener('click', function () {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

searchBox.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

for (const link of filterLink) {
  link.addEventListener('click', function () {
    setActive(link, '.filter-link');
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.item === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Modal/Full Site Modal "open buttons"
for (const elm of openModal) {
  elm.addEventListener('click', function () {
    const modalID = this.dataset.open;
    document.getElementById(modalID).classList.add(isVisible);
  });
}

//Full Site Modal "close buttons"
for (const elm of closeModal) {
  elm.addEventListener('click', function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

// Modal
document.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    document.querySelector('.modal.is-visible').classList.remove(isVisible);
  }
});
