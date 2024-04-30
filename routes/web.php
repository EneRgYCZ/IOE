<?php

use Illuminate\Foundation\Application;
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
    Route::get('/', [\App\Http\Controllers\TeamController::class, 'index'])->name('index');
    Route::post('/', [\App\Http\Controllers\TeamController::class, 'store'])->name('store');
    Route::patch('/{team}', [\App\Http\Controllers\TeamController::class, 'update'])->name('update');
    Route::delete('/{team}', [\App\Http\Controllers\TeamController::class, 'destroy'])->name('destroy');
});

Route::group(['prefix' => 'employees', 'as' => 'employees.'], function () {
    Route::get('/', [\App\Http\Controllers\EmployeeController::class, 'index'])->name('index');
});

Route::group(['prefix' => 'equipment', 'as' => 'equipment.'], function () {
    Route::get('/', [\App\Http\Controllers\EquipmentController::class, 'index'])->name('index');
    Route::post('/desktop', [\App\Http\Controllers\EquipmentController::class, 'storeDesktop'])->name('storeDesktop');
    Route::post('/laptop', [\App\Http\Controllers\EquipmentController::class, 'storeLaptop'])->name('storeLaptop');
    Route::post('/meetingRoomLaptop', [\App\Http\Controllers\EquipmentController::class, 'storeMeetingRoomLaptop'])->name('storeMeetingRoomLaptop');
    Route::patch('/desktop/{desktop}', [\App\Http\Controllers\EquipmentController::class, 'updateDesktop'])->name('updateDesktop');
    Route::patch('/laptop/{laptop}', [\App\Http\Controllers\EquipmentController::class, 'updateLaptop'])->name('updateLaptop');
    Route::patch('/meetingRoomLaptop/{meetingRoomLaptop}', [\App\Http\Controllers\EquipmentController::class, 'updateMeetingRoomLaptop'])->name('updateMeetingRoomLaptop');
    Route::delete('/desktop/{desktop}', [\App\Http\Controllers\EquipmentController::class, 'destroyDesktop'])->name('destroyDesktop');
    Route::delete('/laptop/{laptop}', [\App\Http\Controllers\EquipmentController::class, 'destroyLaptop'])->name('destroyLaptop');
    Route::delete('/meetingRoomLaptop/{meetingRoomLaptop}', [\App\Http\Controllers\EquipmentController::class, 'destroyMeetingRoomLaptop'])->name('destroyMeetingRoomLaptop');
});

Route::group(['prefix' => 'logs', 'as' => 'logs.'], function () {
    Route::get('/', [\App\Http\Controllers\LogsController::class, 'index'])->name('index');
});
