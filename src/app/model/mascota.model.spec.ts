import { Mascota } from './mascota.model';

describe('Mascota Model', () => {
  it('MM-01 should create a pet', () => {
    const pet = new Mascota();
    expect(pet).toBeTruthy();
  });

  it('MM-02 should transform an any[] obtained from REST-API to a Mascota[] array', () => {
    let petsResponse = getExamplePetsResponse();
    let pets = Mascota.deserialize(petsResponse);
    pets.forEach((pet, i) => {
      let petResponse = petsResponse[i];
      expect(pet.id).toEqual(petResponse.id);
      expect(pet.nombre).toEqual(petResponse.nombre);
      expect(pet.fechaNacimiento).toEqual(new Date(petResponse.fecha_nacimiento));
      expect(pet.color).toEqual(petResponse.color);
      expect(pet.isEsterilizado).toEqual(!!petResponse.is_esterilizado);
      expect(pet.isAdoptado).toEqual(!!petResponse.is_adoptado);
      expect(pet.isCasoExterno).toEqual(!!petResponse.is_caso_externo);
      expect(pet.isAdoptable).toEqual(!!petResponse.is_adoptable);
      expect(pet.descripcion).toEqual(petResponse.descripcion);
      expect(pet.sexo).toEqual(petResponse.sexo);
      //expect(pet.ubicacionMascota).toBe(petResponse.ubicacion);
      expect(pet.tipoAnimal).toEqual(petResponse.tipo_mascota);
      expect(pet.imagenUrl).toEqual(petResponse.imagen_url);
    });
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
      ubicacion: 'REFUGIO',
      tipo_mascota: 'perro',
      imagen_url: 'gs://gpa-findmepet.appspot.com/pantera.jpg',
    },
  ];
}
