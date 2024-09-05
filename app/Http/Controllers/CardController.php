<?php

namespace App\Http\Controllers;

use App\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index()
    {

        $cards = Card::with('products')
        ->where('is_removed', false)
        ->get();
        return response()->json(
            ["cards" => $cards],
            200            
        );
    }

    public function remove($id)
    {
        $card = Card::findOrFail($id);
        $card->is_removed = true;
        $card->save();
        return response()->json(
            ["message" => "Card deleted",
            "card" => $card],
            200
        );
    }
}
