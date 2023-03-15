<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\UserController;
use App\Models\ArugaUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::post('/users', [UserController::class, 'insert']);
Route::get('/users', [UserController::class, 'show']);
Route::post('/edit-user', [UserController::class, 'edit']);
Route::get('/users/{id}', [UserController::class, 'showID']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/postjob', [JobsController::class, 'insert']);
Route::get('/jobs', [JobsController::class, 'show']);
Route::get('/otp', [UserController::class, 'sendMessage']);
Route::post('/blog', [BlogController::class, 'insert']);
Route::get('/blog', [BlogController::class, 'show']);
Route::post('/application', [ApplicationController::class, 'insert']);
Route::get('/application/{id}', [ApplicationController::class, 'show']);

?>

