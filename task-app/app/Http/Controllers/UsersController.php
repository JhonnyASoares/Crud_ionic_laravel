<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

use function Laravel\Prompts\progress;

class UsersController extends Controller
{
    /**
     * Cria um novo usuário.
     *
     * @param Request $request A requisição com os dados do usuário.
     * @return \Illuminate\Http\JsonResponse Uma resposta JSON com o resultado da criação do usuário.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            // Validando os dados do request e customizando as mensagens de erro
            $request->validate([
                'email' => 'required|email|unique:users|min:3|max:255',
                'password' => 'required|string|min:8|max:255|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/',
                'name' => 'required|min:3|max:255'
            ], [
                'email.required' => 'O campo "Email" não pode estar vazio.',
                'email.email' => 'Insira um email válido.',
                'email.unique' => 'Email já cadastrado.',
                'email.min' => 'O campo "Email" deve ter pelo menos 3 caracteres.',
                'email.max' => 'O campo "Email" deve ter de menos 255 caracteres.',
                'password.required' => 'O campo "Senha" não pode estar vazio.',
                'password.min' => 'A senha deve ter pelo menos 8 caracteres.',
                'password.max' => 'A senha deve ter de menos 255 caracteres.',
                'password.regex' => 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
                'name.required' => 'O campo "Nome" não pode estar vazio.',
                'name.min' => 'O campo "Nome" deve ter pelo menos 3 caracteres.',
                'name.max' => 'O campo "Nome" deve ter de menos 255 caracteres.'
            ]);
            // Criando o usuário
            $user = new User();
            $user->fill($request->only(['email', 'password', 'name']));
            $user->save();
            // Retornando o usuário criado
            return response()->json([
                'success' => true,
                'data' => $user
            ]);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            // Retornarndo o primeiro erro encontrado
            return response()->json([
                'success' => false,
                'data' => $errors[array_key_first($errors)][0]
            ]);
        }
    }
    /**
     * Retorna todos os usuários cadastrados no banco de dados.
     *
     * @return \Illuminate\Http\JsonResponse Uma resposta JSON contendo os dados dos usuários.
     */
    public function list()
    {
        // Buscando todos usuarios
        $users = User::all();
        // Retornando os usuários
        return response()->json([
            'data' => $users
        ]);
    }

    /**
     * Recupera um usuário pelo seu ID.
     *
     * @param int $id O ID do usuário a ser recuperado.
     * @return \Illuminate\Http\JsonResponse Uma resposta JSON contendo os dados do usuário, se for encontrada, ou uma mensagem de erro, se não for encontrada.
     */
    public function get($id): \Illuminate\Http\JsonResponse
    {
        // Buscando o usuário pelo id
        $user = User::find($id);
        // Verificando se o usuário foi encontrado
        if (!$user) {
            return response()->json([
                'success' => false,
                'data' => 'Usuário n encontrado'
            ]);
        } else {
            return response()->json([
                'success' => true,
                'data' => $user
            ]);
        }
    }

    /**
     * Atualiza um usuário existente.
     *
     * @param int $id O ID do usuário a ser atualizado.
     * @param Request $request A requisição com os dados a serem atualizados.
     * @return \Illuminate\Http\JsonResponse Uma resposta JSON com o resultado da atualização.
     */
    public function update($id, Request $request): \Illuminate\Http\JsonResponse
    {
        $user = User::find($id);
        try {
            // Validando os dados do request
            // return response()->json([
            //     'success' => true,
            //     'data' => $request->all()
            // ]);
            $request->validate([
                'email' => 'required|email|min:3|max:255|unique:users,email,' . $user->id,
                'password' => 'required|string|min:8|max:255|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/',
                'name' => 'required|min:3|max:255'
            ], [
                'email.email' => 'Insira um email válido.',
                'email.required' => 'O campo "Email" não pode estar vazio.',
                'email.min' => 'O campo "Email" deve ter pelo menos 3 caracteres.',
                'email.max' => 'O campo "Email" deve ter de menos 255 caracteres.',
                'email.unique' => 'Email já cadastrado.',
                'password.min' => 'A senha deve ter pelo menos 8 caracteres.',
                'password.max' => 'A senha deve ter de menos 255 caracteres.',
                'password.regex' => 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
                'password.required' => 'O campo "Senha" não pode estar vazio.',
                'name.min' => 'O campo "Nome" deve ter pelo menos 3 caracteres.',
                'name.max' => 'O campo "Nome" deve ter de menos 255 caracteres.',
                'name.required' => 'O campo "Nome" não pode estar vazio.',
            ]);
            // Atualizando o usuário
            $user->fill($request->only(['email', 'password', 'name']));
            $user->save();
            return response()->json([
                'success' => true,
                'data' => $user
            ]);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            // Retornarndo o primeiro erro encontrado
            return response()->json([
                'success' => false,
                'data' => $errors[array_key_first($errors)][0]
            ]);
        }
    }
    /**
     * Exclui um usuário pelo seu ID.
     *
     * @param int $id O ID do usuário a ser excluído.
     * @return \Illuminate\Http\JsonResponse Uma resposta JSON indicando sucesso ou falha.
     */
    public function delete($id): \Illuminate\Http\JsonResponse
    {
        $user = User::find($id);
        // Verificando se o usuário foi encontrado
        if (!$user) {
            return response()->json([
                'success' => false,
                'data' => 'Usuário não encontrado'
            ]);
        } else {
            // Deletando o usuário
            $user->delete();
            return response()->json([
                'success' => true,
                'data' => 'Usuário deletado'
            ]);
        }
    }
}
