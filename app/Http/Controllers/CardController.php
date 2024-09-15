<?php

declare(strict_types=1);

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

    /**
     * This method is used to create a new card using API
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {

        $card = new Card();
        //validate request
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $card->name = $validated['name'];

        $card->save();

        return response()->json(
            [
                "message" => "Card created",
                "card" => $card
            ],
            201
        );
    }
    
    /**
     * This method is used to remove a card using API
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function remove($id): \Illuminate\Http\JsonResponse
    {

        $card = Card::findOrFail($id);

        $card->is_removed = true;
        $card->save();
        return response()->json(
            [
                "message" => "Card deleted",
                "card" => $card
            ],
            200
        );
    }

    /**
     * This method is used to update a card using API
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $card = Card::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string',
            'is_active' => 'required|boolean',
            'accepted' => 'required|boolean',
        ]);

        $card->name = $validated['name'];
        $card->is_active = $validated['is_active'];
        $card->accepted = $validated['accepted'];
        $card->update();


        $products = $request->products;
        if ($products) {
            foreach ($products as $product) {
                $product = Product::findOrFail($product['id']);
                $product->card_id = $card->id;
                $product->update();
            };
        };

        return response()->json(
            [
                "message" => "Card updated",
                "card" => $card
            ],
            200
        );
    }

    /**
     * This method is used to show a single card using API
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function show($id): \Illuminate\Http\JsonResponse
    {
        $card = Card::with('products')->findOrFail($id);
        return response()->json(
            [
                "message" => "single card",
                "card" => $card
            ],
            200
        );
    }
}
