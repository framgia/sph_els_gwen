<?php

namespace App\Http\Controllers\Category;

use App\Models\Choice;
use App\Models\Lesson;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CategoryLessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Category $category)
    {
        $lessons = $category->lessons()->with('choices')->get();
        return $this->successResponse($lessons);
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
        $newLesson = Lesson::create($data);
        foreach($request->choices as $choice) {
           Choice::create([
             'lesson_id'=>$newLesson->id,
              'name' => $choice['name'],
              'is_correct' => $choice['is_correct']
           ]);
        }
        return $this->returnOne($newLesson->load('choices'), 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category, Lesson $lesson)
    {
        $this->checkIfAdmin();
        $this->checkLesson($category, $lesson);
        $lesson->delete();
        return $this->returnOne($lesson);
    }

    protected function checkLesson(Category $category, Lesson $lesson) {
        if($lesson->category_id != $category->id) {
            throw new HttpException(422, 'Lesson does not belong to this category');
        }
    }

}
