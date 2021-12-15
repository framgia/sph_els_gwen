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
        return $this->returnAll($categories);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->checkIfAdmin();

        $data = $request->validate([
            'name' => ['required', Rule::unique('categories', 'name')],
            'description' => ['nullable', 'sometimes']
        ]);

        $newCategory = Category::create([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        return $this->returnOne($newCategory, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return $this->returnOne($category);
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
        $this->checkIfAdmin();
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
        return $this->returnOne($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $this->checkIfAdmin();

        $category->delete();
        return $this->returnOne($category);
    }
}
