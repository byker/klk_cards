<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Card;
use Faker\Generator as Faker;

$factory->define(Card::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'is_active' => false,
        'accepted' => false,
    ];
});
