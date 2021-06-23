import { FiltroPipe } from './filtro.pipe';

describe('FiltroPipe', () => {
  it('FP-01 create an instance', () => {
    const pipe = new FiltroPipe();
    expect(pipe).toBeTruthy();
  });
});
