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
