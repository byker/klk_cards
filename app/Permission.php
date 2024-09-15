<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    public function getUserPermissions(int $role_id): array
    {
        //admin
        if ($role_id == 1) {
            return ['createCard', 'editCard', 'removeCard', 'addCard','deleteCard', 'readCard', 'createProduct', 'editProduct', 'removeProduct', 'deleteProduct', 'readProduct'];
        }
        //redaktor
        elseif ($role_id == 2) {
            return ['createCard', 'editCard', 'removeCard', 'deleteCard', 'readCard'];
        }
        //user
        else {
            return ['readCard'];
        }
    }
}
