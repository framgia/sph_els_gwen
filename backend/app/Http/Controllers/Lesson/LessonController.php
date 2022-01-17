<?php

namespace App\Http\Controllers\Word;

use App\Models\Word;
use App\Models\Choice;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;

class WordController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Word  $word
     * @return \Illuminate\Http\Response
     */
    public function show(Word $word)
    {
        $withChoices = $word->load('choices');
        return $this->returnOne($withChoices);
    }

    public function update(Request $request, Lesson $lesson)
    {
        $this->checkIfAdmin();

        $request->validate([
          'word'=> ['required', 'string'],
          'choices' => ['required', 'array', 'min:4'],
          'choices.*.name' => ['required', 'string'],
          'choices.*.is_correct'=> ['required', 'boolean']
        ]);

        //update lesson
        $lesson->fill($request->only(['word']));
        $lesson->save();

        //update choices
        foreach($request->choices as $choice) {
          Choice::where('id', $choice['id'])->update([
            'name' => $choice['name'],
            'is_correct' => $choice['is_correct']            
          ]);
        }        
        return $this->returnOne($lesson->load('choices'));
    }
}
