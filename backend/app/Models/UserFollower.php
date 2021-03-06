<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFollower extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'follower_id'
    ];

    public function user() {
      return $this->belongsTo(User::class);
    }

    public function activity_logs() {
      return $this->morphMany('App\Models\ActivityLog', 'loggable');
    }

}
