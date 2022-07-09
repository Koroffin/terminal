import { flush } from './flush';

describe('flush util', () => {
  it('flush will be resolved', (done) => {
    flush().then(() => done());
  });
});
