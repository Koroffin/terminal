export const flush = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));
