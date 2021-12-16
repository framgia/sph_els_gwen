<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Category;
use App\Models\Choice;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {        
        foreach(Category::all() as $category) {
            Lesson::factory(5)->create([
                'category_id' => $category->id
            ]);
        }        

        foreach(Lesson::all() as $lesson) { 
            Choice::factory(1)->create(['lesson_id'=>$lesson->id,'is_correct'=>true]);
            Choice::factory(3)->create(['lesson_id'=>$lesson->id,'is_correct'=>false]);
        }
    }
}
