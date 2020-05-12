<?php

namespace szana8\LaraflowEditor;

use Illuminate\Support\ServiceProvider;

class LaraflowEditorServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadRoutesFrom(__DIR__.'/routes.php');

        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'laraflow-editor');

        // Publishing is only necessary when using the CLI.
        if ($this->app->runningInConsole()) {
            $this->bootForConsole();
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        //$this->mergeConfigFrom(__DIR__.'/../config/larafloweditor.php', 'laraflow-editor');

        // Register the service the package provides.
        $this->app->singleton('larafloweditor', function ($app) {
            return new LaraflowEditor;
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['larafloweditor'];
    }

    /**
     * Console-specific booting.
     *
     * @return void
     */
    protected function bootForConsole()
    {
        // Publishing the configuration file.
        $this->publishes([
            __DIR__.'/../config/larafloweditor.php' => config_path('larafloweditor.php'),
        ], 'larafloweditor.config');

        // Publishing the views.
        /*$this->publishes([
            __DIR__.'/../resources/views' => base_path('resources/views/vendor/szana8'),
        ], 'larafloweditor.views');*/

        // Publishing assets.
        /*$this->publishes([
            __DIR__.'/../resources/assets' => public_path('vendor/szana8'),
        ], 'larafloweditor.views');*/

        // Publishing the translation files.
        /*$this->publishes([
            __DIR__.'/../resources/lang' => resource_path('lang/vendor/szana8'),
        ], 'larafloweditor.views');*/

        // Registering package commands.
        // $this->commands([]);
    }
}
