<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $fillable = [
        'name', 'is_active', 'accepted'
    ];
    public function products()
    {
        return $this->hasMany('App\Product');
    }
}
