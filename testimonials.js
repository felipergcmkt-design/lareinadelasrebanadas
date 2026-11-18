const testimonialList = document.getElementById('testimonios-lista');
const testimonialControls = document.querySelector('.sales-testimonials-controls');
const previousTestimonial = testimonialControls.querySelector('[data-testimonials-direction="-1"]');
const nextTestimonial = testimonialControls.querySelector('[data-testimonials-direction="1"]');

function updateTestimonialControls() {
  const maxScroll = testimonialList.scrollWidth - testimonialList.clientWidth;

  previousTestimonial.setAttribute('aria-disabled', String(testimonialList.scrollLeft <= 1));
  nextTestimonial.setAttribute('aria-disabled', String(testimonialList.scrollLeft >= maxScroll - 1));
}

testimonialControls.addEventListener('click', (event) => {
  const button = event.target.closest('[data-testimonials-direction]');
  if (!button || button.getAttribute('aria-disabled') === 'true') return;

  const firstCard = testimonialList.children[0].getBoundingClientRect();
  const secondCard = testimonialList.children[1].getBoundingClientRect();
  const step = secondCard.left - firstCard.left;

  testimonialList.scrollBy(Number(button.dataset.testimonialsDirection) * step, 0);
});

testimonialList.addEventListener('scroll', updateTestimonialControls, { passive: true });
window.addEventListener('resize', updateTestimonialControls);
updateTestimonialControls();
testimonialControls.hidden = false;
