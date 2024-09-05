<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Seed the role's table.
     *
     * @return void
     */
    public function run()
    {

        return [
            DB::table('roles')->insert([
                ['id' => 1, 'name' => 'Admin'],
                ['id' => 2, 'name' => 'User'],
                ['id' => 3, 'name' => 'Guest'],
            ])
        ];

    }
}
