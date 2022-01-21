<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserFollower;
use Illuminate\Database\Seeder;

class UserFollowerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $allUsers = User::where('id', '!=', '1')->get();
      foreach ($allUsers as $user) {
        $randomFollowers = User::select('*')
          ->where('id', '!=' , $user->id)
          ->where('id', '!=', '1')
          ->inRandomOrder()
          ->limit(5)
          ->get();
        foreach($randomFollowers as $randomFollower) {
          UserFollower::create([
            'user_id' => $user->id,
            'follower_id' => $randomFollower->id
          ]);
        }
      }
    }
}
