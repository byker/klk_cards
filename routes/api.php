<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\LoginController;


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

// Auth routes
Route::middleware(['web'])->group(function () {
    Route::post('/validate-token', [LoginController::class, 'validateToken'])->name('auth.validateToken');
    Route::post('/login', [LoginController::class, 'login'])->name('auth.login');
});


Route::middleware('auth:sanctum', 'checkUserPermissions')->group(function () {

    //logout
    Route::post('/logout', [LoginController::class, 'logout'])->name('auth.logout');

    // User routes
    Route::get('/user', [UserController::class, 'show'])->name('user.show');

    // Card routes
    Route::prefix('cards')->group(function () {
        Route::post('/', [CardController::class, 'create'])->name('cards.create');
        Route::get('/', [CardController::class, 'index'])->name('cards.index');
        Route::get('/{id}', [CardController::class, 'show'])->name('cards.show');
        Route::put('/{id}', [CardController::class, 'update'])->name('cards.update');
        Route::delete('/{id}', [CardController::class, 'remove'])->name('cards.remove');
    });

    // Product routes
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('products.index');
        Route::get('/{id}', [ProductController::class, 'show'])->name('products.show');
        Route::get('/not-assigned-to-card/{cardId}', [ProductController::class, 'getProductsNotAssignedToCard'])->name('products.notAssignedToCard');
        Route::put('/detach-from-card/{productId}', [ProductController::class, 'detachFromCard'])->name('products.detachFromCard');
        Route::put('/attach-to-card/{productId}/{cardId}', [ProductController::class, 'attachToCard'])->name('products.attachToCard');
        Route::put('/{id}', [ProductController::class, 'update'])->name('products.update');
    });
});
