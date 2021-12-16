<?php

namespace App\Http\Controllers\Lesson;

use App\Models\Choice;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;

class LessonChoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Lesson $lesson)
    {
        $choices = $lesson->choices;
        return $this->returnAll($choices);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Lesson $lesson, Choice $choice)
    {
        $this->checkIfAdmin();
        $data = $request->validate([
            'name' => ['required', Rule::unique('choices', 'name')],
            'is_correct' => ['required', 'boolean']
        ]);

        $data['lesson_id'] = $lesson->id;
        //check if newly added answer is correct
        if($request['is_correct']) {
            $this->changePreviousCorrectAnswer($lesson);
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
    public function update(Request $request, Lesson $lesson, Choice $choice)
    {
        $this->checkIfAdmin();
        $this->checkChoice($lesson, $choice);
        $request->validate([
            'name' => ['required_without_all:is_correct', Rule::unique('choices', 'name')],
            'is_correct' => ['required_without_all:name', 'boolean']
        ]);

        if($request['is_correct']) {
            $this->changePreviousCorrectAnswer($lesson);
        } else {
            //check if specified choice is the correct answer
            $isCorrectAnswer = $choice->is_correct;
            if($isCorrectAnswer) {
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
    public function destroy(Lesson $lesson, Choice $choice)
    {
        $this->checkIfAdmin();
        $this->checkChoice($lesson, $choice);
        $choice->delete();
        return $this->returnOne($choice);
    }

    protected function checkChoice(Lesson $lesson, Choice $choice) {
        if($choice->lesson_id != $lesson->id) {
            throw new HttpException(422, 'Choice does not belong to this lesson');
        }
    }

    protected function changePreviousCorrectAnswer(Lesson $lesson) {
        //get correct answer of specified lesson and change to false
        Choice::where([
            'lesson_id' => $lesson->id,
            'is_correct' => true
        ])->update(array('is_correct'=>false));
    }

}
