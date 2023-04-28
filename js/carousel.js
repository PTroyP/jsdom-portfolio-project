const slides = document.querySelectorAll('.review-item');
const buttons = document.querySelectorAll('.slide-ctrl-container button');

let current = Math.floor(Math.random() * slides.length);
let next = current < slides.length - 1 ? current + 1 : 0;
let prev = current > 0 ? current - 1 : slides.length - 1;

// Create eventListener for prev/next
// goToNext()
// goToPrev()
// updateIndexes(param)
// updateCSS()
// -- decide how to call prev/next
// -- update variables
// -- [current] = newIndex
//-- [next] current + 1 : 0
//-- [prev] current - 1 : length -1
//-- update the css

const goToNum = (number) => {
  current = number;
  next = current < slides.length - 1 ? current + 1 : 0;
  prev = current > 0 ? current - 1 : slides.length - 1;
  // console.log('current', current);
  // console.log('number', number);
  // console.log('prev', prev);
  // console.log('current', current);
  // console.log('next', next);
};

// const goToNext = () => console.log('Next');
// const goToPrev = () => console.log('Prev');

const goToNext = () =>
  current < slides.length - 1 ? goToNum(current + 1) : goToNum(0);
const goToPrev = () =>
  current > 0 ? goToNum(current - 1) : goToNum(slides.length - 1);

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () =>
    i === 0 ? goToPrev() : goToNext()
  );
}
