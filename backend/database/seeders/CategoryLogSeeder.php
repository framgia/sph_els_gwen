<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Choice;
use App\Models\Category;
use App\Models\CategoryLog;
use Illuminate\Database\Seeder;

class CategoryLogSeeder extends Seeder
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
      $categories = Category::inRandomOrder()->limit(5)->get();
      foreach($categories as $category) {
        foreach($category->words as $word) {
          $randomChoice = Choice::where('word_id', $word->id)->inRandomOrder()->first();        
          $category_log = CategoryLog::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'word_id' => $word->id,
            'choice_id' => $randomChoice->id,
            'is_correct' => $randomChoice->is_correct
          ]);
          $category_log->activity_logs()->create([
            'user_id' => $user->id
          ]);
        }
      }
    }
  }
}
