<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use App\Models\CategoryLog;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpKernel\Exception\HttpException;


class UserController extends Controller
{
    use HandlesAuthorization;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all()->except('is_admin');
        return response()->json([
            'data'=>$users
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        if($user->is_admin && !auth()->user()->is_admin) {
            throw new AuthorizationException('Unauthorized', 403);
        }
        
        return response()->json([
            'data' => $user
        ], 200);
    }

    public function allCategoryLogs($id)
    {
      $user = User::where('id', $id)->get();
      if (count($user) === 0) {
        throw new HttpException(404, 'Resource not found');
      }

      $category_logs = CategoryLog::where('user_id', $id)->get();      
      return $this->returnAll($category_logs);
    }
}
