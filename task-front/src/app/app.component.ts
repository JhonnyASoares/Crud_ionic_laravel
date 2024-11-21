import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Criar usuario', url: '/create', icon: 'person-add' },
    { title: 'Listar usuarios', url: '/list', icon: 'people' },
  ];
  constructor() {}
}
