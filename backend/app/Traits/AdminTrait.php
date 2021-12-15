<?php 

namespace App\Traits;

use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;

trait AdminTrait {
    protected function checkIfAdmin() {
         if (!Gate::allows('can_modify', auth()->user())) {
            throw new AuthorizationException('Unauthorized', 403);
        }
    }
}