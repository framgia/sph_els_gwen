<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register (Request $request) 
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => ['required', 'min:8', 'confirmed']
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        return response()->json([
            'data' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed']
        ]);

        $user = User::where('email', $data['email'])->first();

        if(!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'error' => [
                    'message' => 'Invalid credentials. Please try again.',
                ]
            ], 401);
        }

        $token=$user->createToken('els_gwen_token')->plainTextToken;
        return response()->json([
            'data' => $user,
            'token' => $token
        ], 200);       
    }


    public function logout(User $user)
    {
        $user->tokens()->delete();
        return response()->json([
            'data' => [
                'message' => 'Logged out successfully.'
            ]
        ], 200); 
    }   
}
