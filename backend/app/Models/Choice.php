<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;

     protected $fillable = [
        'name',
        'lesson_id',
        'is_correct'
    ];


    public function lesson() {
        return $this->belongsTo(Lesson::class);
    }
}
