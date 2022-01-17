<?php

namespace App\Http\Controllers\Lesson;
use App\Models\Choice;
use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\HttpException;

class LessonController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function show(Lesson $lesson)
    {
        $withChoices = $lesson->load('choices');
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
