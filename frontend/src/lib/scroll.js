let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

export function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -64, duration: 1.6 });
  } else {
    el.scrollIntoView({ behavior: 'auto' });
  }
}

export function stopScroll() {
  if (lenisInstance) lenisInstance.stop();
}

export function startScroll() {
  if (lenisInstance) lenisInstance.start();
}
