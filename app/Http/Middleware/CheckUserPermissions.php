<?php

namespace App\Http\Middleware;

use Closure;

class CheckUserPermissions
{
    /**
     * Handle permissions of current user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
        $user = $request->user();

        //admin
        if ($user->role_id == 1) {
            $user->permissions = ['createCard', 'editCard', 'removeCard', 'addCard','deleteCard', 'readCard', 'createProduct', 'editProduct', 'removeProduct', 'deleteProduct', 'readProduct'];
        }
        //redaktor
        elseif ($user->role_id == 2) {
            $user->permissions = ['createCard', 'editCard', 'removeCard', 'deleteCard', 'readCard'];
        }
        //user
        else {
            $user->permissions = ['readCard'];
        }

        return $next($request);
    }
}
