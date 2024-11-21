# Crud_ionic_laravel
Este projeto é um sistema simples de CRUD (Create, Read, Update, Delete) de pessoas, desenvolvido para demonstrar habilidades práticas em Ionic (frontend) e Laravel (backend). Ele permite a gestão de pessoas, com funcionalidades de adição, listagem, edição e exclusão.

## Índice
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação e Configuração](#instalacao-e-configuracao)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (Ionic)](#frontend-ionic)
- [Importando Dados Iniciais do Banco de Dados](#importando-dados-iniciais-do-banco-de-dados)
- [Uso](#uso)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Licença](#licenca)

---
## Tecnologias Utilizadas
- Frontend: [Ionic Framework](https://ionicframework.com/)
- Backend: [Laravel Framework](https://laravel.com/)
- Banco de Dados: MySQL
---
## Funcionalidades
- Criar: Adicionar novas pessoas com informações básicas (nome, e-mail, etc.).
- Listar: Visualizar uma lista de pessoas cadastradas.
- Atualizar: Editar informações de uma pessoa existente.
- Excluir: Remover uma pessoa do sistema.
---
## Requisitos
Certifique-se de que seu ambiente atenda aos seguintes requisitos:

- Node.js (v16 ou superior)
- Composer (v2 ou superior)
- PHP (v8.1 ou superior)
- MySQL (ou outro banco de dados compatível)
- Ionic CLI (instalado globalmente)
- Laravel Installer (opcional)
---
## Instalação e Configuração 
### Backend (Laravel)
1. Clone o repositório:
```bash
git clone https://github.com/JhonnyASoares/Crud_ionic_laravel
cd back-end
```
2. Instale as dependências:
```bash
composer install
```
3. Copie o arquivo de configuração .env e configure o banco de dados:
```bash
cp .env.example .env
```
Atualize as variáveis do banco de dados no .env:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task
DB_USERNAME=root
DB_PASSWORD=
```
4. Gere a chave do aplicativo:
```bash
php artisan key:generate
```
5. Execute as migrações e, se aplicável, as seeds:
```bash
php artisan migrate --seed
```
6. Inicie o servidor:
```bash
php artisan serve
```
O backend estará disponível em: http://localhost:8000
---
### Frontend (Ionic)
1. Navegue até a pasta do frontend:
```bash
cd front-end
```
2. Instale as dependências:
```bash
npm install
```
3. Atualize o arquivo de configuração de API (src/environments/environment.ts) para apontar para o backend:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```
4. Inicie o servidor do frontend:
```bash
ionic serve
```
O frontend estará disponível em: http://localhost:8100
---
## Importando Dados Iniciais do Banco de Dados

Este projeto inclui um arquivo MySQL com dados de exemplo para facilitar o teste. Siga os passos abaixo para importar o arquivo:

1. Certifique-se de que o banco de dados MySQL está em execução.
2. Crie um banco de dados com o nome especificado no arquivo `.env` (task):
   ```sql
   CREATE DATABASE task;
3. Acesse o diretório onde está localizado o arquivo .sql (task.sql).
4. Use o comando abaixo para importar o arquivo SQL:
```bash
mysql -u root -p task < task.sql
```
5. Verifique se os dados foram importados corretamente, executando o seguinte comando:
```sql
SELECT * FROM users;
```
O arquivo SQL está na frente do projeto justo das pastas front-end e back-end `task.sql`.
---
## Uso
1. Acesse a interface do frontend em http://localhost:8100.
2. Realize operações de criação, leitura, atualização e exclusão através da interface intuitiva.
3. Certifique-se de que o backend está em execução para garantir o funcionamento da API.
---
## Estrutura de Pastas
```bash
/back-end       # Código fonte do backend Laravel
/front-end      # Código fonte do frontend Ionic
```
---
## Licença 
Este projeto é de uso pessoal e foi desenvolvido como parte de uma entrevista técnica. Sinta-se à vontade para explorá-lo e utilizá-lo para fins de estudo.
