<?php
declare(strict_types=1);
namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{

    /**
     * This method is used to get all products using API
     * @return \Illuminate\Http\JsonResponse
     *  
     */

    public function index(): \Illuminate\Http\JsonResponse
    {
        $products = Product::all();

        return response()->json(
            ["products" => $products],
            200
        );
    }

    /**
     * This method is used to show a product with id using API
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * 
     */

    public function show($id): \Illuminate\Http\JsonResponse
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
/*
* This method is used to update a product using API
* @param Request $request
* @param $id
* @return \Illuminate\Http\JsonResponse
*/


    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
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

    /**
     * This method is used to get all products not assigned to a card using API
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * 
     */

    public function getProductsNotAssignedToCard($cardId): \Illuminate\Http\JsonResponse
    {
        $products = DB::table('products')->where('card_id', '!=', $cardId)->get();

        return response()->json(
            ["products" => $products],
            200
        );


    }
    /**
     * This method is used to attach a product to a card using API
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function attachToCard($productId, $cardId) : \Illuminate\Http\JsonResponse
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
    /**
     * This method is used to detach a product from a card using API
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function detachFromCard($productid): \Illuminate\Http\JsonResponse
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
