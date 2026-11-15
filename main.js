document.getElementById('year').textContent = new Date().getFullYear();
// Preserva apenas os parâmetros de atribuição usados no checkout.
const checkoutLink = document.getElementById('comprar-ahora');
if (checkoutLink) {
  const checkoutUrl = new URL(checkoutLink.href);
  const campaignParams = new URLSearchParams(window.location.search);
  const allowedParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'src', 'sck'];
  allowedParams.forEach(key => {
    const value = campaignParams.get(key);
    if (value && !checkoutUrl.searchParams.has(key)) checkoutUrl.searchParams.set(key, value);
  });
  checkoutLink.href = checkoutUrl.href;
}

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

const vipCountdown = document.getElementById('vip-countdown-time');
if (vipCountdown) {
  const key = 'la-reina-vip-primeiro-acesso-v1';
  const duration = 48 * 60 * 60 * 1000;
  let firstVisit = Date.now();

  try {
    const saved = Number(localStorage.getItem(key));
    if (Number.isFinite(saved) && saved > 0) firstVisit = saved;
    else localStorage.setItem(key, String(firstVisit));
  } catch {
    try {
      const saved = Number(sessionStorage.getItem(key));
      if (Number.isFinite(saved) && saved > 0) firstVisit = saved;
      else sessionStorage.setItem(key, String(firstVisit));
    } catch {
      // O relógio continua nesta visita se o navegador bloquear o armazenamento.
    }
  }

  const endsAt = firstVisit + duration;
  const countdown = vipCountdown;
  const label = document.getElementById('vip-countdown-label');

  let interval;
  function updateVipCountdown() {
    const total = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    const twoDigits = value => String(value).padStart(2, '0');
    countdown.textContent = `${twoDigits(days)}d ${twoDigits(hours)}h ${twoDigits(minutes)}m ${twoDigits(seconds)}s`;

    if (total === 0) {
      label.textContent = 'Oferta finalizada';
      if (interval) clearInterval(interval);
    }
  }

  updateVipCountdown();
  if (endsAt > Date.now()) interval = setInterval(updateVipCountdown, 1000);
}
