import { Mascota } from '../model/mascota.model';
import { FiltroPipe } from './name.pipe';

describe('FiltroPipe', () => {
  let pets: Mascota[];
  let pipe: FiltroPipe;
  beforeAll(() => {
    pipe = new FiltroPipe();

    let petJuan = new Mascota();
    petJuan.nombre = 'Juan';
    let petMichael = new Mascota();
    petMichael.nombre = 'Michael';
    let petAndre = new Mascota();
    petAndre.nombre = 'Andre';
    let petMimi = new Mascota();
    petMimi.nombre = 'Mimi';
    let petMichu = new Mascota();
    petMichu.nombre = 'Michu';
    let petLuna = new Mascota();
    petLuna.nombre = 'Luna';

    pets = [petJuan, petMichael, petAndre, petMimi, petMichu, petLuna];
  });

  it('FP-01 should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('FP-02 should filter nothing', () => {
    const petsFiltered = pipe.transform(pets, '');
    expect(petsFiltered).toEqual(pets);
  });

  it('FP-03 should filter nothing', () => {
    const petsFiltered = pipe.transform(pets, undefined);
    expect(petsFiltered).toEqual(pets);
  });

  it('FP-04 should filter pets contining "Mi" ', () => {
    const petsFiltered = pipe.transform(pets, 'Mi');
    expect(petsFiltered.length).toBe(3);
    petsFiltered.forEach((petFiltered) => {
      expect(petFiltered.nombre.toLowerCase()).toContain('mi');
    });
  });

  it('FP-05 should filter every pet', () => {
    const petsFiltered = pipe.transform(pets, 'ññ');
    expect(petsFiltered.length).toBe(0);
  });
});
