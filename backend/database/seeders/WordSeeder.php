<?php

namespace Database\Seeders;

use App\Models\Word;
use App\Models\Category;
use App\Models\Choice;
use Illuminate\Database\Seeder;

class WordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {        
        foreach(Category::all() as $category) {
            Word::factory(5)->create([
                'category_id' => $category->id
            ]);
        }        

        foreach(Word::all() as $words) { 
            Choice::factory(1)->create(['word_id'=>$words->id,'is_correct'=>true]);
            Choice::factory(3)->create(['word_id'=>$words->id,'is_correct'=>false]);
        }
    }
}
