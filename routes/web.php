<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('employees.index');
});

Route::group(['prefix' => 'teams', 'as' => 'teams.'], function () {
    Route::get('/', [\App\Http\Controllers\TeamController::class, 'index'])
        ->name('index');
    Route::post('/', [\App\Http\Controllers\TeamController::class, 'store'])
        ->name('store');
    Route::patch('/{team}', [\App\Http\Controllers\TeamController::class, 'update'])
        ->name('update');
    Route::delete('/{team}', [\App\Http\Controllers\TeamController::class, 'destroy'])
        ->name('destroy');
});

Route::group(['prefix' => 'employees', 'as' => 'employees.'], function () {
    Route::get('/', [\App\Http\Controllers\EmployeeController::class, 'index'])
        ->name('index');
    Route::post('/', [\App\Http\Controllers\EmployeeController::class, 'store'])
        ->name('store');
    Route::patch('/{employee}', [\App\Http\Controllers\EmployeeController::class, 'update'])
        ->name('update');
    Route::delete('/{employee}', [\App\Http\Controllers\EmployeeController::class, 'destroy'])
        ->name('destroy');
});

Route::group(['prefix' => 'equipment', 'as' => 'equipment.'], function () {
    // Add view routes for each category
    Route::get('/desktops', [\App\Http\Controllers\EquipmentController::class, 'desktopsIndex'])
        ->name('desktops');
    Route::get('/laptops', [\App\Http\Controllers\EquipmentController::class, 'laptopsIndex'])
        ->name('laptops');
    Route::get('/meeting-room-laptops', [\App\Http\Controllers\EquipmentController::class, 'meetingRoomLaptopIndex'])
        ->name('meeting-room-laptops');

    // CRUD operations for desktops
    Route::post('/desktop', [\App\Http\Controllers\EquipmentController::class, 'storeDesktop'])
        ->name('storeDesktop');
    Route::patch('/desktop/{desktop}', [\App\Http\Controllers\EquipmentController::class, 'updateDesktop'])
        ->name('updateDesktop');
    Route::delete('/desktop/{desktop}', [\App\Http\Controllers\EquipmentController::class, 'destroyDesktop'])
        ->name('destroyDesktop');

    // CRUD operations for laptops
    Route::post('/laptop', [\App\Http\Controllers\EquipmentController::class, 'storeLaptop'])
        ->name('storeLaptop');
    Route::patch('/laptop/{laptop}', [\App\Http\Controllers\EquipmentController::class, 'updateLaptop'])
        ->name('updateLaptop');
    Route::delete('/laptop/{laptop}', [\App\Http\Controllers\EquipmentController::class, 'destroyLaptop'])
        ->name('destroyLaptop');

    // CRUD operations for meeting room laptops
    Route::post('/meetingRoomLaptop', [\App\Http\Controllers\EquipmentController::class, 'storeMeetingRoomLaptop'])
        ->name('storeMeetingRoomLaptop');
    Route::patch('/meetingRoomLaptop/{meetingRoomLaptop}',
        [\App\Http\Controllers\EquipmentController::class, 'updateMeetingRoomLaptop'])
        ->name('updateMeetingRoomLaptop');
    Route::delete('/meetingRoomLaptop/{meetingRoomLaptop}',
        [\App\Http\Controllers\EquipmentController::class, 'destroyMeetingRoomLaptop'])
        ->name('destroyMeetingRoomLaptop');
});

Route::resource('logs', \App\Http\Controllers\LogsController::class)->except(['update', 'destroy', 'store']);
