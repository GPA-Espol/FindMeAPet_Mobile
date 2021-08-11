/**
 * Class containing the actions that the admin can do regarding the forms.
 * @category Model
 */
export class AdministrarFormulario {
  public eliminarFormularioVoluntario() {
    // TODO implementar método
  }

  public eliminarFormularioPonerAdopcion() {
    // TODO implementar método
  }

  public eliminarFormularioAdopcion() {
    // TODO implementar método
  }

  public async revisarFormularios() {
    return [
      {
        id: 1,
        nombre: 'Eunice',
        apellido: 'Gálvez',
        ciudad: 'Guayaquil',
        fecha_nacimiento: '1998-08-16',
        correo_electronico: 'eagalvez@espol.edu.ec',
        id_mascota: 1,
      },
      {
        id: 2,
        nombre: 'Juan',
        apellido: 'Pérez',
        ciudad: 'Guayaquil',
        fecha_nacimiento: '1970-06-15',
        correo_electronico: 'juan@espol.edu.ec',
        id_mascota: 2,
      },
      {
        id: 3,
        nombre: 'María',
        apellido: 'Gómez',
        ciudad: 'Guayaquil',
        fecha_nacimiento: '2000-02-28',
        correo_electronico: 'maria@espol.edu.ec',
        id_mascota: 3,
      },
    ];
  }

  public async responderFormularioAdopcion(idForm: number, acepta: boolean) {
    // TODO implementar método
  }
}
