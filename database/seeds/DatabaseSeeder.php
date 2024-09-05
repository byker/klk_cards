<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Role;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {


        factory(App\Card::class, 10)->create()->each(function ($card) {
            $card->products()->save(factory(App\Product::class)->make());
        });

        $this->call(RoleSeeder::class);

        factory(App\User::class, 10)->create();
        factory(App\Product::class, 50)->create();


    }
}
