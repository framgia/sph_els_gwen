<?php

namespace App\Models;

use App\Models\Word;
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
}
