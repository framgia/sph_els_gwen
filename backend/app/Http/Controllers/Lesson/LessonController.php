<?php

namespace App\Http\Controllers\Word;

use App\Models\Word;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
}
