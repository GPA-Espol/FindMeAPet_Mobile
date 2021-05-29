import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-pets',
  templateUrl: './tab-pets.page.html',
  styleUrls: ['./tab-pets.page.scss'],
})
export class TabPetsPage implements OnInit {
  animals = [
    { img:'./assets/Doraemon.png', name: 'Doraemon', location: 'Refugio' , age:'3 años', description:'Es un gato timido ideal para personas como tu.'},
    { img:'./assets/Firulice.png', name: 'Firulice', location: 'Dentro de Espol' , age:'1 año', description:'Es un gato feroz, no debe ser puesto en adopción.'},
    { img:'./assets/Pepito.png', name: 'Pepito', location: 'Refugio' , age:'3 meses', description:'Es un gato sociable bastante juguetón.'},
    { img:'./assets/Mimi.png', name: 'Mimí', location: 'Externo' , age:'3 años', description:'Es un gato activo, sociable y bastante juguetón.'},
    { img:'./assets/Memento.png', name: 'Memento', location: 'Refugio' , age:'2 meses', description:'Es un gato feroz, no debe ser puesto en adopción.'},
  ];
  constructor() { }

  ngOnInit() {
  }
  buscar(event){
    console.log(event);
    
  } 

}
