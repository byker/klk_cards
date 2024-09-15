<?php

namespace App\Http\Middleware;

use Closure;
use App\Permission;

class CheckUserPermissions
{

    protected $permission;


    /**
     * Handle permissions of current user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function __construct(Permission $permission)
    {
        $this->permission = $permission;
    }

    public function handle($request, Closure $next)
    {

        $user = $request->user();
        $user->permissions = $this->permission->getUserPermissions($user->role_id);

        return $next($request);
    }
}
