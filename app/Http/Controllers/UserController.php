<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{


    /**
     * This method is used to show the user using API
     * Permissions are added to this object by midlleware CheckUserPermissions
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse 
     */

    public function show(): \Illuminate\Http\JsonResponse
    {
        
        $user= Auth::user();
        return response()->json(['user' => $user], 201);
    }
}
