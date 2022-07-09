declare global {
  namespace jest {
    interface Matchers<R> {
      toBeFocused(): CustomMatcherResult;
      toBeDOMElement(): CustomMatcherResult;
    }
  }
}

export {};
