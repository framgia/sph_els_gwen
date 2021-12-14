<?php

namespace App\Exceptions;

use Exception;
use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var string[]
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var string[]
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (Exception $e, $request) {
            if ($request->wantsJson()) {           
                 if($e instanceof NotFoundHttpException) {
                    // echo(get_class($e));
                    return response()->json([
                        'error' => 'Resource not found'
                    ], 404);
                }

                if ($e instanceof AuthenticationException) {
                    return response()->json([
                        'error' => [
                            'message' => 'Unauthenticated. Please login.'
                        ]
                    ], 401);
                }

                if ($e instanceof AuthorizationException || $e instanceof AccessDeniedHttpException) {
                    return response()->json([
                        'error' => 'Unauthorized'
                    ], 403);
                }

                if ($e instanceof MethodNotAllowedHttpException) {
                    return response()->json([
                        'error' => [
                            'message' => 'Not Allowed'
                        ]
                    ], 405);
                }

                if($e instanceof ValidationException) {
                    $this->convertValidationExceptionToResponse($e, $request);
                }

                //generic error message
                else {
                    return response()->json([
                        'error' => [
                            'message' => 'Something went wrong. Try again later.'
                        ]
                    ], 500);
                }
                // return parent::render($request, $e);
                
            } //end of if($request->wantsJson())
        }); //end of renderable
    }


    protected function convertValidationExceptionToResponse(ValidationException $e, $request)
    {
        $errors = $e->validator->errors();
        return response()->json([
            'error' => [
                'message' => $errors,
            ]
        ], 422);
    }




}
