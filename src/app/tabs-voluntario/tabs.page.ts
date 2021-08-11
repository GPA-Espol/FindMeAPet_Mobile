import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  tabSelected = 'mascotas';
  tabs = [
    {
      tab: 'mascotas',
      icon: 'assets/icon/huella.svg',
      iconActivo: 'assets/icon/huella_activo.svg',
    },
    {
      tab: 'perfil',
      icon: 'assets/icon/perfil.svg',
      iconActivo: 'assets/icon/perfil_activo.svg',
    },
    {
      tab: 'inicio',
      icon: 'assets/icon/inicio.svg',
      iconActivo: 'assets/icon/inicio_activo.svg',
    },
    {
      tab: 'reporte-actividad',
      icon: 'assets/icon/actividad.svg',
      iconActivo: 'assets/icon/actividad_activo.svg',
    },
    {
      tab: 'puntos-alimentacion',
      icon: 'assets/icon/brujula.svg',
      iconActivo: 'assets/icon/brujula_activo.svg',
    },
  ];
  @ViewChild(IonTabs) ionTabs: IonTabs;

  changeTab() {
    this.tabSelected = this.ionTabs.getSelected();
  }
}
