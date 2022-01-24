<?php

namespace App\Http\Controllers\User;

use stdClass;
use App\Models\User;
use App\Models\UserFollower;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserFollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
      $followers = UserFollower::where('user_id', $user->id)->get();
      return $this->returnAll($followers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
      $request->validate([
        'following_id' => ['required', 'integer', Rule::exists('users', 'id')]
      ]);

      // user id must not be the user's id or the admin's id
      if ($request['following_id'] == $user->id || $request['following_id'] == 1) {
        throw new HttpException(400, 'Invalid user id provided');
      }

      $alreadyFollowing = UserFollower::where('follower_id', $user->id)->where('user_id', $request['following_id'])->first();
      if ($alreadyFollowing) {
        throw new HttpException(409, 'You are already following this user');
      }

      $following = UserFollower::create([
        'user_id' => $request['following_id'],
        'follower_id' => $user->id
      ]);

      return $this->returnOne($following, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($user_id, $following_id)
    {
      $user_not_existing = User::where('id', $user_id)->get()->count() === 0; 
      $following_not_existing = User::where('id', $following_id)->get()->count() === 0;
      $isAdmin =  $user_id==1 || $following_id==1;
      $sameId = $user_id == $following_id;

      if ($user_not_existing || $following_not_existing || $isAdmin || $sameId) {
        throw new HttpException(400, 'Invalid user id provided');
      }

      $not_following = UserFollower::where('follower_id', $user_id)
        ->where('user_id', $following_id)->get()->count() === 0;
      if ($not_following) {
        throw new HttpException(400, 'You are not following this user');
      }

      $following_record = UserFollower::where('follower_id', $user_id)
        ->where('user_id', $following_id)
        ->first();
      $following_record->delete();
      return $this->returnOne($following_record);
    }

    public function getUserFollowing($user_id)
    {
      $user_not_existing = User::where('id', $user_id)->get()->count() === 0;
      if($user_not_existing)
      {
        throw new HttpException(400, 'Invalid user id provided');
      }
     
      $following = UserFollower::where('follower_id', $user_id)->get();
      return $this->returnAll($following);
    }
}
