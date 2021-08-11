import { TestBed } from '@angular/core/testing';

import { Utils } from './utils';

describe('UtilsService', () => {
  let service: Utils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Utils);
  });

  it('UT-01 should be created', () => {
    expect(service).toBeTruthy();
  });

  it('UT-02 should return that time equal to now has not expired', () => {
    let isExpired = Utils.cacheExpired(new Date().getTime());
    expect(isExpired).toBeFalse();
  });

  it('UT-03 should return that time equal to 29m59s before now has not expired', () => {
    let time = new Date().getTime();
    let timeBefore = subtractTime(time, 29, 59);
    let isExpired = Utils.cacheExpired(timeBefore);
    expect(isExpired).toBeFalse();
  });

  it('UT-04 should return that time equal to 30m01s before now has expired', () => {
    let time = new Date().getTime();
    let timeBefore = subtractTime(time, 30, 1);
    let isExpired = Utils.cacheExpired(timeBefore);
    expect(isExpired).toBeTrue();
  });

  it('UT-05 should return that time equal to 50m00s before now has expired', () => {
    let time = new Date().getTime();
    let timeBefore = subtractTime(time, 50, 0);
    let isExpired = Utils.cacheExpired(timeBefore);
    expect(isExpired).toBeTrue();
  });
});

function subtractTime(time: number, minutes: number, seconds: number) {
  return time - minutes * 60 * 1000 - seconds * 1000;
}
