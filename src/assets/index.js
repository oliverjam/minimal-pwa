const keyCodes = {
  left: 37,
  right: 39,
};

const slides = Array.from(document.querySelectorAll('.slide'));
let currentSlide = 0;

function scroll(e) {
  if (e.keyCode === keyCodes.left) {
    if (e.preventDefault) e.preventDefault();
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
      currentSlide -= 1;
      return;
    } else {
      scrollToSlide(slides.length - 1);
      currentSlide = slides.length - 1;
      return;
    }
  }
  if (e.keyCode === keyCodes.right) {
    if (e.preventDefault) e.preventDefault();
    if (currentSlide < slides.length - 1) {
      scrollToSlide(currentSlide + 1);
      currentSlide += 1;
      return;
    } else {
      scrollToSlide(0);
      currentSlide = 0;
      return;
    }
  }
}

function scrollToSlide(index) {
  return slides[index].scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('keydown', scroll);

const buttons = document.querySelectorAll('.nav__button');
buttons.forEach(button => {
  button.removeAttribute('disabled');
  const keyCode = parseInt(button.dataset.direction, 10);
  button.addEventListener('click', () => {
    scroll({ keyCode: keyCode });
  });
});
