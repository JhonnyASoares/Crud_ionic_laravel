import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-select',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
})
export class SelectPage implements OnInit {

  userId: string | null = null;
  userData: any = {};
  // Utilidzado para fazer o Sheet de botões
  isActionSheetOpen: boolean = false;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  protected form: FormGroup;

  constructor(protected formBuilder: FormBuilder, private route: ActivatedRoute, private apiService: ApiService, private router: Router, private toastController: ToastController, private actionSheetCtrl: ActionSheetController) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.fetchUser();
    this.form = this.formBuilder.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]],
      'email': ['', [
        Validators.email,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$')
      ]]
    });
  }

  ngOnInit() { }

  /**
   * Retorna uma mensagem de erro para um determinado campo do formulário.
   * @param controlName O nome do campo do formulário.
   * @returns Uma mensagem de erro ou uma string vazia caso o campo esteja válido.
   */
  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Campo obrigatório.';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `O comprimento mínimo é ${requiredLength} caracteres.`;
    }
    if (control?.hasError('maxlength')) {
      const requiredLength = control.getError('maxlength').requiredLength;
      return `O comprimento maximo é ${requiredLength} caracteres.`;
    }
    if (control?.hasError('email')) {
      return 'Email inválido.';
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'email') {
        return 'Email inválido.';
      } else if (controlName === 'password') {
        return 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.';
      }
    }
    return '';
  }
   /**
   * Exibe um toast com uma mensagem personalizada.
   *
   * @param message A mensagem a ser exibida no toast.
   * @param color A cor do toast. Valores possíveis: 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'.
   */
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'middle',
      color: color,
    });
    await toast.present();
  }

  /**
   * Função chamada quando o action sheet de deletar ou cancelar é fechado.
   * Verifica se o botão delete foi clicado e, se sim, chama a função deleteUser.
   * @param event Evento do action sheet.
   */
  async onActionSheetDismiss(event: any) {
    const action = event.detail.data?.action;
    // Se clicar no botão delete chama a função de deletar
    if (action === 'delete') {
      this.deleteUser();
    }
  }

  /**
   * Chama a API para buscar os dados do usuário pelo ID.
   * O endpoint da API é 'get/<id-do-usuário>'.
   * Se a API retornar com sucesso, o objeto userData é preenchido com os dados do usuário.
   * Além disso, os campos de data criada e atualizada são formatados para pt-BR.
   * Se a API retornar com erro, o erro é exibido no console.
   */
  fetchUser() {
    this.apiService.getData('get/' + this.userId) //+ this.userId Substitua 'users' pelo endpoint da sua API
      .subscribe(
        (response) => {
          this.userData = response.data;
          const formatter = new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
          this.userData.created_at = formatter.format(new Date(this.userData.created_at));
          this.userData.updated_at = formatter.format(new Date(this.userData.updated_at));
          this.form.patchValue({
            name: this.userData.name,
            email: this.userData.email
          });
        },
        (error) => {
          console.error('Erro ao acessar a API:', error);
        }
      );
  }

  /**
   * Atualiza um usuário existente.
   * O endpoint da API é 'update/<id-do-usuário>'.
   * Se o formulário for válido, o método envia uma requisição para a API com os dados do usuário
   * modificados. Se a API retornar com sucesso, uma mensagem de sucesso é exibida. Caso contrário,
   * uma mensagem de erro é exibida. Se a API retornar com erro, o erro é exibido no console.
   */
  updateUser() {
    if (this.form.valid) {
      this.apiService.putData('update/' + this.userId, this.form.value) //+ this.userId Substitua 'users' pelo endpoint da sua API
        .subscribe(
          (response) => {
            if (response.success == true) {
              this.presentToast('Usuário atualizado com sucesso!', 'success');
            } else {
              this.presentToast(response.data, 'warning');
            }
          },
          (error) => {
            console.error('Erro ao atualizar usuário:', error);
          }
        );
    } else {
      this.presentToast('Não pode haver campos vazios ou campos com dados inválidos.', 'warning');
    }
  }
  /**
   * Exclui um usuário existente.
   * O endpoint da API é 'delete/<id-do-usuário>'.
   * Se a API retornar com sucesso, o usuário é redirecionado para a tela de listagem de usuários. 
   * Caso contrário, uma mensagem de erro é exibida no console.
   */
  deleteUser() {
    this.apiService.deleteData('delete/' + this.userId)
      .subscribe(
        (response) => {
          if (response.success == true) {
            this.router.navigate(['/list']);
          }
        },
        (error) => {
          console.error('Erro ao deletar usuário:', error);
        }
      );
  }
}
