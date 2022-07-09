import { configure } from '@testing-library/react';

beforeEach(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});

expect.extend({
  toBeFocused: (received) => {
    const pass = received === document.activeElement;
    return {
      pass,
      message: () => `expected ${received} to be focused`,
    };
  },
  toBeDOMElement: (received) => {
    const pass = received instanceof HTMLElement;
    return {
      pass,
      message: () => `expected ${received} to be a DOM element`,
    };
  },
});

configure({ testIdAttribute: 'data-autotest-id' });
