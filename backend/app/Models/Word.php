<?php

namespace App\Models;

use App\Models\Category;
use App\Models\CategoryLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Word extends Model
{
    use HasFactory;

    protected $fillable = [
        'word',
        'category_id',
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function choices() {
        return $this->hasMany(Choice::class);
    }
    
    public function category_logs() {
      return $this->hasMany(CategoryLog::class);
    }
}
