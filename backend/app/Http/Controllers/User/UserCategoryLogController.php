<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use App\Models\Word;
use App\Models\Choice;
use App\Models\Category;
use App\Models\CategoryLog;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserCategoryLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user, Category $category)
    {
      $category_logs = $user->category_logs()->where('category_id', $category->id)->get();
      return $this->returnAll($category_logs);
    }
 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user, Category $category)
    {
      $data = $request->validate([
        'word_id' => ['required'],
        'choice_id' => ['required'],
        'is_correct'=> ['required', 'boolean'],
      ]);

      $word = Word::where('id', $data['word_id'])->first();
      $choice = Choice::where('id', $data['choice_id'])->first();
      
      // check if word belongs to category
      $this->checkWord($category, $word);
      // check if choice belongs to word
      $this->checkChoice($word, $choice);

      // check if user already has record of word
      $logExists = $user->category_logs->where('word_id', $word->id);

      if(count($logExists)!==0) {
        // user already has record of that word
        throw new HttpException(409, 'There is already a category log for this word');
      }
            
      $category_log = CategoryLog::create([
        'user_id'=> $user->id,
        'category_id' => $category->id,
        'word_id' => $word->id,
        'choice_id' => $choice->id,
        'is_correct'=> $data['is_correct'],
      ]);   

      return $this->returnOne($category_log);      
    }
}
