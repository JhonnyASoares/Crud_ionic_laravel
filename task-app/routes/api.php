<?php

use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Definindo as rotas da API
Route::prefix('usuarios')->group(function () {
    Route::post('/create', [UsersController::class, 'store']);
    Route::get('/list', [UsersController::class, 'list']);
    Route::get('/get/{id}', [UsersController::class, 'get']);
    Route::put('/update/{id}', [UsersController::class, 'update']);
    Route::delete('/delete/{id}', [UsersController::class, 'delete']);
});
