<?php 

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

trait ApiResponse {
    protected function successResponse($message, $status = 200) {
        return response()->json([
            'data' => $message
        ], $status);
    }

    protected function errorResponse($error, $status) {
        return response()->json([
            'error' => $error
        ], $status);
    }

    protected function returnAll(Collection $collection, $code=200) {
        return $this->successResponse($collection, $code);
    }

    protected function returnOne(Model $model, $code=200) {
        return $this->successResponse($model, $code);
    }


}