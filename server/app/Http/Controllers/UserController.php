<?php

namespace App\Http\Controllers;

use App\Models\ArugaUser;
use App\Models\BabysitterModel;
use App\Models\ParentModel;
use Illuminate\Http\Request;
use Twilio\Rest\Client;

class UserController extends Controller
{


    static $id;

    public function show(){
        return ArugaUser::where('type', 'babysitter')->get();
    }

    public function insert(Request $request) {
        $user = new ArugaUser();

    $user->username = $request->username;
    $user->firstname = $request->firstname;
    $user->lastname = $request->lastname;
    $user->address = $request->address;
    $user->email = $request->email;
    $filename = $request->file->store('public');
    $storeFile = str_replace("public", "storage", $filename);
    $user->img = $storeFile;
    $id = uniqid('user');
    $user->user_id = $id;
    $user->telno = $request->telno;
    $user->deleted = $request->deleted;
    $user->mobileno = $request->mobileno;
    $user->password = password_hash($request->password, PASSWORD_DEFAULT);
    $user->type = $request->type;
    $user->status = $request->status;




    $user->save();


    if($request->type == "parent") {
        $parent = new ParentModel();
        $parent->parent_id = uniqid('parent');
        $parent->user_id = $id;
        $parent->save();
    } else {
        $babysitter = new BabysitterModel();
        $babysitter->babysitter_id= uniqid('babysitter');
        $babysitter->user_id = $id;
        $babysitter->save();
    }

    return 'Success';
    }

    public function showID(Request $request){
        return ArugaUser::where('user_id', $request->route('id'))->get();
    }


    public function sendMessage(Request $request) {


        self::$id = substr(uniqid('', true), -3);

        if(!ArugaUser::where('mobileno', $request->mobileno)->exists()){
            return response()->json(['error' => 'Resource not found'], 404);
        } else {
            $sid = "AC8239eb606e924309de484fd150b2f5f8";
            $token = "40a577ab3c671341bce3ce3699513f91";
            $twilio = new Client($sid, $token);
            $message = $twilio->messages
                            ->create("+639608997323", // to
                                    [
                                        "body" => "Your Aruga verification code is 4578",
                                        "from" => "+12765985201"
                                    ]
                            );

            return response()->json(['message' => 'success'], 200);
        }
    }

    public function verifyNumber(Request $request) {
        if($request->otp == "4578"){
            return ArugaUser::where('mobileno', $request->mobileno)->get();
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }



    }

    public function edit(Request $request) {

        $userid = $request->userid;
        $address = $request->address;
        $mobileno = $request->mobileno;
        $email = $request->email;
        $firstname = $request->firstname;
        $lastname = $request->lastname;

        if($request->file == null || $request->file == "") {
            $storeFile = ArugaUser::where('user_id', $request->userid)->value('img');
        } else {
            $filename = $request->file->store('public');
            $storeFile = str_replace("public", "storage", $filename);
        }


        return ArugaUser::where('user_id', $userid)->update(['img' => $storeFile, 'address' => $address, 'mobileno' => $mobileno, 'email' => $email, 'firstname' => $firstname, 'lastname' => $lastname]);


    }

    public function login(Request $request) {
        $data = ArugaUser::where('email', $request->email)->value('password');
        $userid = ArugaUser::where('email', $request->email)->value('user_id');
        $userimg = ArugaUser::where('email', $request->email)->value('img');
        $usertype = ArugaUser::where('email', $request->email)->value('type');
        if(password_verify($request->password, $data)){
            return array(
                'message' => 'Success',
                'userid'=> $userid,
                'userimg' => $userimg,
                'type' => $usertype
            );
        } else {
            return array(
                'message' => 'Error'
            );
        }
    }


}

?>
