<?php

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

Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Card routes
    Route::prefix('cards')->group(function () {
        Route::post('/', 'CardController@create')->name('cards.create');
        Route::get('/', 'CardController@index')->name('cards.index');
        Route::get('/{id}', 'CardController@show')->name('cards.show');
        Route::put('/{id}', 'CardController@update')->name('cards.update');
        Route::delete('/{id}', 'CardController@destroy')->name('cards.destroy');
    });

    // Product routes
    Route::prefix('products')->group(function () {
        Route::get('/', 'ProductController@index')->name('products.index');
        Route::get('/{id}', 'ProductController@show')->name('products.show');
        Route::get('/not-assigned-to-card/{cardId}', 'ProductController@getProductsNotAssignedToCard')->name('products.notAssignedToCard');
        Route::put('/detach-from-card/{productId}', 'ProductController@detachFromCard')->name('products.detachFromCard');
        Route::put('/attach-to-card/{productId}/{cardId}', 'ProductController@attachToCard')->name('products.attachToCard');
        Route::put('/{id}', 'ProductController@update')->name('products.update');
    });

   });