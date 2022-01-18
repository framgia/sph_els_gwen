<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Lesson\LessonController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Category\CategoryLessonController;
use App\Http\Controllers\Choice\ChoiceController;
use App\Http\Controllers\Lesson\LessonChoiceController;

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
    Route::resource('users',UserController::class)
        ->only(['index', 'show']);

    //--------------------CATEGORIES----------------------//
    Route::resource('categories', CategoryController::class)
        ->except(['create', 'edit']);
    Route::resource('categories.lessons',CategoryLessonController::class)
        ->except(['create', 'edit', 'show', 'update']);

    //--------------------LESSONS----------------------//
    Route::resource('lessons',LessonController::class)
      ->only(['show', 'update']);

    //--------------------CHOICES----------------------//
    Route::get('choices/{choice}',[ChoiceController::class, 'show']);
    
});

