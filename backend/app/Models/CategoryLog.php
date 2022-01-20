<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'word_id',
        'choice_id',
        'is_correct',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
      return $this->belongsTo(Category::class);
    }

    public function choice() {
      return $this->belongsTo(Choice::class);
    }

    public function word() {
      return $this->belongsTo(Word::class);
    }
}
