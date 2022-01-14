<?php

namespace App\Http\Controllers\Lesson;

use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
}
