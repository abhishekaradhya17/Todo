<?php

use App\Http\Controllers\CrudAppController;
use App\Http\Controllers\TodoController;
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

Route::post('/createTodo',[TodoController::class,'create'])->name('create.todo');
Route::post('/updateTodo',[TodoController::class,'update'])->name('update.todo');
Route::get('/getTodos/',[TodoController::class,'getTodos'])->name('get.todos');
Route::get('/getTodo/{id}',[TodoController::class,'getTodo'])->name('get.todo');
Route::get('/deleteTodo/{id}',[TodoController::class,'deleteTodo'])->name('delete.todos');    