<?php

namespace App\Http\Controllers\Category;

use App\Models\Word;
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
            'word' => [
                'required', 
                Rule::unique('words', 'word')
            ]
        ]);

        $data['category_id'] = $category->id;
        $newWord = Word::create($data);
        return $this->returnOne($newWord, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category, Word $word)
    {
        $this->checkIfAdmin();
        $this->checkWord($category, $word);
        $request->validate([
            'word' => ['required', Rule::unique('words', 'word')->ignore($word->id)]
        ]);

        $word->fill($request->only(['word']));
        $word->save();
        return $this->returnOne($word);
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
