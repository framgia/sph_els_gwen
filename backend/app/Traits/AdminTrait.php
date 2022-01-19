<?php 

namespace App\Traits;

use App\Models\Word;
use App\Models\Choice;
use App\Models\Category;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

trait AdminTrait {
    protected function checkIfAdmin() {
         if (!Gate::allows('can_modify', auth()->user())) {
            throw new AuthorizationException('Unauthorized', 403);
        }
    }
    
    protected function checkWord(Category $category, Word $word) {
        if($word->category_id != $category->id) {
            throw new HttpException(422, 'Word does not belong to this category');
        }
    }

    protected function checkChoice(Word $word, Choice $choice) {
        if($choice->word_id != $word->id) {
            throw new HttpException(422, 'Choice does not belong to this word');
        }
    }
}