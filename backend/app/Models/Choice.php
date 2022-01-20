<?php

namespace App\Models;

use App\Models\Word;
use App\Models\CategoryLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Choice extends Model
{
    use HasFactory;

     protected $fillable = [
        'name',
        'word_id',
        'is_correct'
    ];


    public function word() {
      return $this->belongsTo(Word::class);
    }

    public function category_logs() {
      return $this->hasMany(CategoryLog::class);
    }
}
