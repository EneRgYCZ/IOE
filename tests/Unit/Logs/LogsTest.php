<?php

use Illuminate\Support\Facades\Route;
use Spatie\Activitylog\Models\Activity;

it('displays activity logs', function () {
    Activity::create([
        'log_name' => 'default',
        'description' => 'Sample activity',
        'properties' => json_encode(['attributes' => ['action' => 'created']]),
        'event' => 'created',
    ]);

    $response = $this->get(route('logs.index'));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('Logs/index')
                ->has('logs.data', 1)
                ->has(
                    'logs.data.0',
                    fn ($page) => $page
                        ->where('event', 'created')
                        ->etc()
                )
        );
});

it('can search for a log', function () {
    Activity::create([
        'log_name' => 'default',
        'description' => 'Sample activity',
        'properties' => json_encode(['attributes' => ['action' => 'created']]),
        'event' => 'created',
    ]);

    $response = $this->get(route('logs.index'));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('Logs/index')
                ->has('logs.data', 1)
                ->has(
                    'logs.data.0',
                    fn ($page) => $page
                        ->where('event', 'created')
                        ->etc()
                )
        );

    $resp = $this->get('/logs?search=default');
    $response->assertStatus(200);
    $response->assertSee('default');
});

it('does not have create log entry route', function () {
    $this->assertFalse(Route::has('logs.store'), 'Route logs.store is unexpectedly defined');
});

it('does not have edit log entry route', function () {
    $this->assertFalse(Route::has('logs.update'), 'Route logs.update is unexpectedly defined');
});

it('does not have delete log entry route', function () {
    $this->assertFalse(Route::has('logs.destroy'), 'Route logs.destroy is unexpectedly defined');
});
