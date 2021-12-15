<?php

namespace App\Http\Controllers\Category;

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
        $lessons = $category->lessons;    
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
            'word' => [
                'required', 
                Rule::unique('lessons', 'word')
            ]
        ]);

        $data['category_id'] = $category->id;
        $newLesson = Lesson::create($data);
        return $this->returnOne($newLesson, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category, Lesson $lesson)
    {
        $this->checkIfAdmin();
        $this->checkLesson($category, $lesson);
        $request->validate([
            'word' => ['required', Rule::unique('lessons', 'word')->ignore($lesson->id)]
        ]);

        $lesson->fill($request->only(['word']));
        $lesson->save();
        return $this->returnOne($lesson);
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
