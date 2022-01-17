<?php

namespace App\Http\Controllers\Category;

use App\Models\Word;
use App\Models\Choice;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CategoryWordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Category $category)
    {
        $words = $category->words()->with('choices')->get();
        return $this->successResponse($words);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Category $category)
    {
        $this->checkIfAdmin();
        $data = $request->validate([
          'word'=> ['required', 'string'],
          'choices' => ['required', 'array', 'min:4'],
          'choices.*.name' => ['required', 'string'],
          'choices.*.is_correct'=> ['required', 'boolean']
        ]);

        $data['category_id'] = $category->id;
        $newWord = Word::create($data);
        foreach($request->choices as $choice) {
           Choice::create([
             'word_id'=>$newWord->id,
              'name' => $choice['name'],
              'is_correct' => $choice['is_correct']
           ]);
        }
        return $this->returnOne($newWord->load('choices'), 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category, Word $word)
    {
        $this->checkIfAdmin();
        $this->checkWord($category, $word);
        $word->delete();
        return $this->returnOne($word);
    }

    protected function checkWord(Category $category, Word $word) {
        if($word->category_id != $category->id) {
            throw new HttpException(422, 'Word does not belong to this category');
        }
    }

}
