<?php

namespace App\Http\Controllers\Category;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        $this->returnAll($categories);
        return response()->json([
            'data' => $categories
        ], 200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // echo(auth()->user());
        if (!Gate::allows('can_modify', auth()->user())) {
            throw new AuthorizationException('Unauthorized', 403);        
        }

        $data = $request->validate([
            'name' => ['required', Rule::unique('categories', 'name')],
            'description' => ['nullable', 'sometimes']
        ]);

        $newCategory = Category::create([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        return response()->json([
            'data' => $newCategory,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return response()->json([
            'data' => $category
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        if (!Gate::allows('can_modify', auth()->user())) {
            throw new AuthorizationException('Unauthorized', 403);
        }

        $request->validate([
            'name' => [
                'required', 
                Rule::unique('categories', 'name')->ignore($category->id)
            ],
            'description' => ['nullable', 'sometimes']
        ]);

        $category->fill($request->only([
            'name',
            'description'
        ]));

        $category->save();

        return response()->json([
            'data' => $category
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        if (!Gate::allows('can_modify', auth()->user())) {
            throw new AuthorizationException('Unauthorized', 403);
        }

        $category->delete();
        return response()->json([
            'data' => $category
        ], 200);
    }
}
