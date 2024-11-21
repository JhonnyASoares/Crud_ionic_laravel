import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  users: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.fetchUsers();
  }

  /**
   * Chama a API para buscar os dados de todos os usuários.
   * O endpoint da API  'list'.
   * Se a API retornar com sucesso, o array users   preenchido com os dados dos usu rios.
   * Se a API retornar com erro, o erro é exibido no console.
   */
  fetchUsers() {
    this.apiService.getData('list') 
      .subscribe(
        (response) => {

          this.users = response.data;
        },
        (error) => {
          console.error('Erro ao acessar a API:', error);
        }
      );
  }
  /**
   * Redireciona para a página de edição do usuário com o ID informado.
   * @param userId O ID do usuário a ser editado.
   */
  redirectToSelect(userId: number) {
    this.router.navigate(['/select', userId]);
  }
  /**
   * Exclui um usuário pelo seu ID.
   * @param userId O ID do usuário a ser excluído.
   */
  deleteUser(userId: number) {
    this.apiService.deleteData(`delete/${userId}`)
    .subscribe(
      (response) => {
        if (response.success == true) {
          this.users = this.users.filter(user => user.id !== userId);
        }
      },
      (error) => {
        console.error('Erro ao acessar a API:', error);
      }
    );
  }
}
