<?php

namespace App\Models;

use App\Models\Word;
use App\Models\CategoryLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function words() {
        return $this->hasMany(Word::class);
    }

    public function category_logs() {
      return $this->hasMany(CategoryLog::class);
    }
}
