<?php

namespace App\Http\Controllers\Word;

use App\Models\Choice;
use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;

class WordChoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Word $word)
    {
        $choices = $word->choices;
        return $this->returnAll($choices);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Word $word, Choice $choice)
    {
        $this->checkIfAdmin();
        $data = $request->validate([
            'name' => 'required',
            'is_correct' => ['required', 'boolean']
        ]);

        $data['word_id'] = $word->id;
        //check if newly added answer is correct
        if($request['is_correct']) {
            $this->changePreviousCorrectAnswer($word);
        }
        $newChoice = Choice::create($data);
        return $this->returnOne($newChoice);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Word $word, Choice $choice)
    {
        $this->checkIfAdmin();
        $this->checkChoice($word, $choice);
        $request->validate([
            'name' => ['required_without_all:is_correct', Rule::unique('choices', 'name')->ignore($choice->id)],
            'is_correct' => ['required_without_all:name', 'boolean']
        ]);

        if($request['is_correct']) {
            $this->changePreviousCorrectAnswer($word);
        } else {
            //check if specified choice is the correct answer
            $isCorrectAnswer = $choice->is_correct;
<<<<<<< HEAD
            if ($isCorrectAnswer) {
=======
            if($isCorrectAnswer) {
>>>>>>> 6b56ad2 (changed filenames, table names and fields from lessons to words in backend side)
                throw new HttpException(422, 'The question must have a correct answer.');
            }
        }
        $choice->fill($request->only(['name','is_correct']));
        $choice->save();
        return $this->returnOne($choice);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Word $word, Choice $choice)
    {
        $this->checkIfAdmin();
        $this->checkChoice($word, $choice);
        $choice->delete();
        return $this->returnOne($choice);
    }

    protected function checkChoice(Word $word, Choice $choice) {
        if ($choice->word_id != $word->id) {
            throw new HttpException(422, 'Choice does not belong to this word');
        }
    }

    protected function changePreviousCorrectAnswer(Word $word) {
        //get correct answer of specified word and change to false
        Choice::where([
            'word_id' => $word->id,
            'is_correct' => true
        ])->update(array('is_correct'=>false));
    }

}
