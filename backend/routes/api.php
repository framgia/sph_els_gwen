<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post(
    'users/register',
    [AuthController::class, 'register']
);
Route::post(
    'users/login',
    [AuthController::class, 'login']
);

Route::group(['middleware'=> ['auth:sanctum']], function () {
    Route::post(
        'users/logout',
        [AuthController::class, 'logout']
    );
    Route::resource(
        'users', 
    UserController::class
    )->only(['index', 'show']);
});

