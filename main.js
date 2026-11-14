document.getElementById('year').textContent = new Date().getFullYear();
const launchDialog = document.getElementById('launch-dialog');
document.querySelector('.launch-button').addEventListener('click', () => launchDialog.showModal());
document.querySelectorAll('.dialog-close, .dialog-dismiss').forEach(button => {
  button.addEventListener('click', () => launchDialog.close());
});
launchDialog.addEventListener('click', event => {
  if (event.target === launchDialog) {
    const bounds = launchDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) launchDialog.close();
  }
});

const carousel = document.querySelector('.hero-carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dots = [...carousel.querySelectorAll('.carousel-dot')];
  const previous = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const status = carousel.querySelector('.carousel-status');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let scheduled = false;

  function update(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    dots.forEach((dot, position) => {
      if (position === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    status.textContent = `Foto ${current + 1} de ${slides.length}`;
  }

  function goTo(index, smooth = true) {
    const destination = Math.max(0, Math.min(index, slides.length - 1));
    slides[destination].querySelector('img').loading = 'eager';
    track.scrollTo({ left: destination * track.clientWidth, behavior: smooth && !reduceMotion.matches ? 'smooth' : 'auto' });
    update(destination);
  }

  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  track.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      update(Math.round(track.scrollLeft / track.clientWidth));
    });
  }, { passive: true });
  window.addEventListener('resize', () => goTo(current, false));
  update(0);
}
