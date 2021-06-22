import { Mascota } from './mascota.model';

describe('Mascota Model', () => {
  it('MM-01 should create a pet', () => {
    const pet = new Mascota();
    expect(pet).toBeTruthy();
  });

  it('MM-02 should transform an any[] obtained from REST-API to a Mascota[] array', () => {
    
  });
});

function getExamplePetsResponse() {
  return [
    {
      id: 4,
      nombre: 'Rayoback',
      fecha_nacimiento: '2019-01-28',
      color: 'gris',
      is_esterilizado: true,
      is_adoptado: true,
      is_caso_externo: true,
      is_adoptable: true,
      descripcion: 'cazador y cariñoso',
      sexo: 'M',
      fecha_adopcion: '2017-08-09T00:00:00.000Z',
      ubicacion: 'REFUGIO',
      tipo_mascota: 'gato',
      imagen_url: 'gs://gpa-findmepet.appspot.com/amarillo.jpg',
    },
    {
      id: 5,
      nombre: 'Flaca',
      fecha_nacimiento: '2020-01-01',
      color: 'caramelo',
      is_esterilizado: false,
      is_adoptado: true,
      is_caso_externo: false,
      is_adoptable: false,
      descripcion: 'perrita canela con manchistas blancas, encontrada con pierna herida',
      sexo: 'H',
      fecha_adopcion: '2021-01-21T00:00:00.000Z',
      ubicacion: 'REFUGIO',
      tipo_mascota: 'perro',
      imagen_url: 'gs://gpa-findmepet.appspot.com/pantera.jpg',
    },
  ];
}
