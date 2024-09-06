<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $products= Product::all();
        
        return response()->json(
            ["products" => $products],
            200
        );
    }

    public function getProduct($id)
    {
        $product = Product::findOrFail($id);
        return response()->json(
            ["message" => "single product",
            "product" => $product],
            200
        );
    }
}
