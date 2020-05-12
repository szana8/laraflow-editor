<?php

namespace szana8\LaraflowEditor\Http\Controllers;

use Illuminate\Routing\Controller;

class LaraflowEditorController extends Controller
{
	public function index()
    {
        return view('laraflow-editor::index');
    }
}
