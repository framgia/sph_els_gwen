<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\UserCategoryLogController;
use App\Http\Controllers\Word\WordController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Category\CategoryWordController;
use App\Http\Controllers\Choice\ChoiceController;
use App\Models\CategoryLog;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('users/register',[AuthController::class, 'register']);
Route::post('users/login',[AuthController::class, 'login']);

Route::group(['middleware'=> ['auth:sanctum']], function () {

    //--------------------USERS----------------------//    
    Route::post('users/logout',[AuthController::class, 'logout']);
    Route::resource('users', UserController::class)
        ->only(['index', 'show']);
    Route::get('users/{id}/category_logs', [UserController::class, 'allCategoryLogs']);
    Route::resource('users.categories.category_logs', UserCategoryLogController::class)
        ->only(['index', 'store']);

    //--------------------CATEGORIES----------------------//
    Route::resource('categories', CategoryController::class)
        ->except(['create', 'edit']);
    Route::resource('categories.words',CategoryWordController::class)
        ->except(['create', 'edit', 'show', 'update']);

    //--------------------WORDS----------------------//
    Route::resource('words',WordController::class)
      ->only(['show', 'update']);

    //--------------------CHOICES----------------------//
    Route::get('choices/{choice}',[ChoiceController::class, 'show']);
    
});

