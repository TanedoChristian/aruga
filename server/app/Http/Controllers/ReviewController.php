<?php

namespace App\Http\Controllers;

use App\Models\ReviewModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    public function get(){
        return ReviewModel::all();
    }


    public function getById(Request $request){

        $result = DB::select('SELECT REVIEWS.*, USERS.firstname, USERS.lastname, users.img FROM REVIEWS INNER JOIN USERS ON USERS.USER_ID = REVIEWS.PARENT_ID where reviews.babysitter_id = ?', [$request->route('id')]);
        return $result;
    }
    public function insert(Request $request){


        $review = new ReviewModel();

        $review->review_id = uniqid('R');
        $review->parent_id = $request->parent_id;
        $review->babysitter_id = $request->babysitter_id;
        $review->review_ratings = $request->review_ratings;
        $review->review_details = $request->review_details;
        $review->review_deleted = 0;
        $review->save();

        return response()->json(['message' => 'success'], 200);

    }
}
