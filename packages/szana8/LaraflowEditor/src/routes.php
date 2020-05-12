  <?php

Route::group([
    'prefix' => 'laraflow-editor',
    'namespace' => 'szana8\LaraflowEditor\Http\Controllers'
    //'middleware' => config('laraflow-editor.middleware', [])
], static function () {
	 Route::get('/', 'LaraflowEditorController@index');
});
