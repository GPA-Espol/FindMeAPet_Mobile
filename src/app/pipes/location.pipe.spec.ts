import { LugarPipe } from './location.pipe';

describe('LugarPipe', () => {
  let pipe: LugarPipe;

  beforeEach(() => {
    pipe = new LugarPipe();
  });

  it('LP-01 create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
