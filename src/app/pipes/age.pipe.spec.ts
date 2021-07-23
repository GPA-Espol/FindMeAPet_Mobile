import * as moment from 'moment';
import { AgePipe } from './age.pipe';

describe('AgePipe', () => {
  let pipe: AgePipe;

  beforeEach(() => {
    pipe = new AgePipe();
  });

  it('AP-01 should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('AP-02 should return "1 día"', () => {
    const date = moment(new Date().toUTCString()).subtract(1, 'd').format('YYYY-MM-DD');
    const transformDate = pipe.transform(date);
    expect(transformDate).toBe('1 día');
  });

  it('AP-03 should return "5 días"', () => {
    const date = moment(new Date().toUTCString()).subtract(5, 'd').format('YYYY-MM-DD');
    const transformDate = pipe.transform(date);
    expect(transformDate).toBe('5 días');
  });

  it('AP-04 should return "1 mes"', () => {
    const date = moment(new Date().toUTCString()).subtract(1, 'M').format('YYYY-MM-DD');
    const transformDate = pipe.transform(date);
    expect(transformDate).toBe('1 mes');
  });

  it('AP-05 should return "7 meses"', () => {
    const date = moment(new Date().toUTCString()).subtract(7, 'M').format('YYYY-MM-DD');
    const transformDate = pipe.transform(date);
    expect(transformDate).toBe('7 meses');
  });

  it('AP-06 should return "1 año"', () => {
    const date = moment(new Date().toUTCString()).subtract(1, 'y').format('YYYY-MM-DD');
    const transformDate = pipe.transform(date);
    expect(transformDate).toBe('1 año');
  });

  it('AP-07 should return "3 años"', () => {
    const date = moment(new Date().toUTCString()).subtract(3, 'y').format('YYYY-MM-DD');
    const transformDate = pipe.transform(date);
    expect(transformDate).toBe('3 años');
  });
});
