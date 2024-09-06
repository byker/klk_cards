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

Route::middleware('auth:api')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
});
Route::post('/cards', 'CardController@create')->name('cards.create');
Route::get('/cards', 'CardController@index')->name('cards.index');
Route::delete('/{id}/cards', 'CardController@remove')->name('cards.remove');
Route::put('/{id}/cards', 'CardController@update')->name('cards.update');
