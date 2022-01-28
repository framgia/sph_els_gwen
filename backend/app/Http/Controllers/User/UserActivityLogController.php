<?php

namespace App\Http\Controllers\User;

use stdClass;
use App\Models\User;
use App\Models\Category;
use App\Models\ActivityLog;
use App\Models\CategoryLog;
use App\Models\UserFollower;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class UserActivityLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($user_id)
    {
      // get following of user
      $user_following = UserFollower::where('follower_id', $user_id)->pluck('user_id');
      $user_following->push($user_id);
      $following_activity =  ActivityLog::whereIn('user_id', $user_following)->get()->sortByDesc('created_at')->values();
      return $this->returnAll($this->makeActivityLogResponse($following_activity));
    }

    protected function makeActivityLogResponse($activity_logs)
    {      
      $response = new Collection();
      $category_id = 0;
      
      foreach($activity_logs as $log) {
        $log_response = new stdClass();
        $log_response->log_id = $log->id;

        //retrieve user details (owner of activity log)
        $log_response->user = User::find($log->user_id, ['id', 'name', 'user_image']);

        // for activity logs about completed categories (quiz)
        if ($log->loggable_type === 'App\Models\CategoryLog') {
          // find category log
          $category_log = CategoryLog::find($log->loggable_id);

          // condition to check if category id is the same
          // since there are multiple category logs for a single
          if ($category_id !== $category_log->category_id) {
            // get category name and id
            $log_response->category = Category::find($category_log->category_id, ['id', 'name']);
            
            // get all category logs of category id
            $category_logs = CategoryLog::where([
              'category_id' => $category_log->category_id,
              'user_id' => $log->user_id,
            ])->get();

            $log_response->words_learned = $category_logs->where('is_correct', true)->count();
            $log_response->words_count = $category_logs->count();
            $log_response->date =  $this->convertDate($category_log->created_at);
            $response->push($log_response);
          }
          $category_id = $category_log->category_id;
        } 
        // for activity logs about new followers
        else if ($log->loggable_type === 'App\Models\UserFollower') {
          $user_follower = UserFollower::find($log->loggable_id);
          $log_response->follower = User::find($user_follower->follower_id);
          $log_response->date = $this->convertDate($user_follower->created_at);
          $response->push($log_response);
        }
      }
      return $response;
    }

    protected function convertDate($date) {
      if($date->isToday()) {
        return $date->diffForHumans();
      } else {
       return date('d-M-y', strtotime($date));
      }
    }
}
