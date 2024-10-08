<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */


    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }



    /**
     * This method is used to login the user using API
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * 
     */

    public function login(Request $request): \Illuminate\Http\JsonResponse
    {

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            // Store the token in the session
            $request->session()->put('authToken', $token);

            return response()->json(['token' => $token], 200);
        }

        return response()->json(['error' => 'The provided credentials do not match our records.'], 401);
    }

    /**
     * This method is used to validate the token
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * 
     */

    public function validateToken(Request $request): \Illuminate\Http\JsonResponse
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        try {
            $user = Auth::guard('sanctum')->user();
            if ($user) {
                return response()->json(['message' => 'Token is valid', 'valid' => true], 200);
            } else {
                return response()->json(['error' => 'Token is invalid', 'valid' => false], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token validation failed'], 401);
        }
    }

    /**
     * This method is used to logout the user
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * 
     */

    public function logout(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out', 'user' => $request->user()], 200);
    }
}
