<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'description', 'price', 'card_id'
    ];
    public function card()
    {
        return $this->belongsTo('App\Card');
    }
}
