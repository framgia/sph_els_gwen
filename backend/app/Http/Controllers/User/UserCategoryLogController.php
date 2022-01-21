<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use App\Models\Word;
use App\Models\Choice;
use App\Models\Category;
use App\Models\CategoryLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Collection;
use stdClass;
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
      // getting specific category log of user
      $category_logs = CategoryLog::where(['user_id' => $user->id, 'category_id' => $category->id])->get();

      $category_logs_response = new Collection();
      foreach($category_logs as $category_log) {
        $word = Word::where('id', $category_log->word_id)->first();
        $answer = Choice::where('id', $category_log->choice_id)->first();
        $response = $this->makeCategoryLogResponse($category_log, $word, $answer);
        $category_logs_response->push($response);
      }
      return $this->returnAll($category_logs_response);
    }
 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user, Category $category)
    {
       $request->validate([
        'answers' => ['required', 'array'],
        'answers.*.word_id' => ['required', 'integer'],
        'answers.*.id' => ['required', 'integer'],
      ]);

      $category_logs_response = new Collection();
      foreach ($request['answers'] as $answer) {
        $word = Word::where('id', $answer['word_id'])->first();
        $answer = Choice::where('id', $answer['id'])->first();
        $this->checkChoice($word, $answer);

        // check if user already has record of word
        $logExists = $user->category_logs->where('word_id', $word->id);
        if(count($logExists)!==0) {
          // user already has record of that word
          throw new HttpException(409, 'There is already a category log for this word');
        }

        $newCategoryLog = CategoryLog::create([
          'user_id'=> $user->id,
          'category_id' => $category->id,
          'word_id' => $word->id,
          'choice_id' => $answer['id'],
          'is_correct'=> $answer['is_correct'],
        ]);

        $category_log = $this->makeCategoryLogResponse($newCategoryLog, $word, $answer);
        $category_logs_response->push($category_log);
      }

      return $this->returnAll($category_logs_response, 201);
    }

    /* 
      for making of a simplified category log response
      includes category log id, word and its choices
      and is_correct field to indicate if user's answer is correct or not
    */
    protected function makeCategoryLogResponse(CategoryLog $category_log, Word $word, Choice $answer)
    {
      $category_log_response = new stdClass();
      $category_log_response->id = $category_log->id;
      $category_log_response->word = $word->word;
      $category_log_response->choices = $this->makeChoicesResponse($word, $answer);
      $category_log_response->is_correct = $answer->is_correct;
      return $category_log_response;
    }

    /* 
      for making of choices response array
      includes choices (name, is_correct) of specified word id
      and additional field "user_answer" to indicate which choice was chosen as the answer of the user
    */
    protected function makeChoicesResponse(Word $word, Choice $answer)
    {
      $choices_collection = new Collection();
      foreach ($word->choices as $choice) {
        // making the choices response array
        $choices_response = new stdClass();
        $choices_response->name = $choice->name;
        $choices_response->user_answer = $choice->id === $answer->id;
        $choices_response->is_correct = $choice->is_correct;
        $choices_collection->push($choices_response);
      }
      return $choices_collection;
    }


}
