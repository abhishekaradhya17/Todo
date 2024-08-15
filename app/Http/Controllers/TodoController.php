<?php

namespace App\Http\Controllers;

use App\Models\todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function getTodos(){
        return todo::orderBy('created_at','desc')->paginate(5);
    }
    public function deleteTodo($id){
        $deleteTodo=todo::findOrFail($id)->delete();
        if($deleteTodo){
            return true;
        }else{
            false;
        }
    }
    public function update(Request $request){
        $request->validate([
            'todoId' => 'required',
            'name'=>'required',
            'desc'=>'required',
            'date'=>'required',
        ]);
        $findTodo=todo::findOrFail($request->todoId);
        $updateTodo=$findTodo->update([
            'name'=>$request->name,
            'description'=>$request->desc,
            'date_time'=>$request->date,
        ]);
        return true;
    }
    public function getTodo($id){
        return todo::find($id);
    }
    public function create(Request $request){
        $request->validate([
            'name'=>'required',
            'desc'=>'required',
            'date'=>'required',
        ]);

        $createTodo=todo::create([
            'name'=>$request->name,
            'description'=>$request->desc,
            'date_time'=>$request->date,
        ]);
        if($createTodo){

            return true;
        }
        else{
            return false;
        }
    }
    //
}
