<?php

namespace App\Http\Controllers;

use App\Card;
use App\Product;
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

    public function create(Request $request){

        $card = new Card();
        $card->name = $request->name;
        $card->save();
        return response()->json(
            ["message" => "Card created",
            "card" => $card],
            201
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
    public function update(Request $request , $id)
    {
        $card = Card::findOrFail($id);
        $card->name = $request->name;
        $card->is_active = $request->is_active;
        $card->accepted = $request->accepted;
        $card->update();

               
        $products = $request->products;        
        if($products){
           foreach($products as $product){
            $product = Product::findOrFail($product['id']);
            $product->card_id = $card->id;
            $product->update();
           };
        };

        return response()->json(
            ["message" => "Card updated",
            "card" => $card],
            200
        );
    }
    public function show($id)
    {
        $card = Card::with('products')->findOrFail($id);
        return response()->json(
            ["message" => "single card",
            "card" => $card],
            200
        );
    }
}
