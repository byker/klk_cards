<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();

        return response()->json(
            ["products" => $products],
            200
        );
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json(
            [
                "message" => "single product",
                "product" => $product
            ],
            200
        );
    }
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->update();

        return response()->json(
            [
                "message" => "product updated",
                "product" => $product
            ],
            200
        );
    }

    public function getProductsNotAssignedToCard($cardId)
    {
        $products = DB::table('products')->where('card_id', '!=', $cardId)->get();

        return response()->json(
            ["products" => $products],
            200
        );


    }

    public function attachToCard($productId, $cardId)
    {
        $product = Product::findOrFail($productId);
        $product->card_id = $cardId;
        $product->save();

        return response()->json(
            [
                "message" => "single product",
                "product" => $product
            ],
            200
        );
    }
    public function detachFromCard($productid)
    {
        $product = Product::findOrFail($productid);
        $product->card_id = null;
        $product->save();

        return response()->json(
            [
                "message" => "single product",
                "product" => $product
            ],
            200
        );
    }
}
