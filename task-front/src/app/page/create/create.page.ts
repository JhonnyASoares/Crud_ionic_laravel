import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  protected form: FormGroup;

  constructor(protected formBuilder: FormBuilder, private apiService: ApiService, private toastController: ToastController) {
    this.form = this.formBuilder.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]],
      'email': ['', [
        Validators.required,
        Validators.email,
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
   * Realiza o envio dos dados do formulário para a API.
   *
   * Caso o formulário esteja válido, faz uma requisição POST para a API com os dados do formulário.
   * Se a API retornar sucesso, exibe um toast com a mensagem de sucesso.
   * Se a API retornar um erro, exibe um toast com a mensagem de erro.
   * Se ocorrer um erro inesperado, exibe o erro no console.
   */
  onSubmit() {
    if (this.form.valid) {
      const endpoint = 'create';
      const data = this.form.value;
      this.apiService.postData(endpoint, data).subscribe(
        (response) => {
          if (response.success == true) {
            this.presentToast('Usuário criado com sucesso!', 'success');
          } else {
            this.presentToast(response.data, 'warning');
          }
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      );
    }
    else {
      this.presentToast('Não pode haver campos vazios ou campos com dados inválidos.', 'warning');
    }
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
}
