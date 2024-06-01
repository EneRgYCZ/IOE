<?php

namespace Tests\Unit\Equipment;

use App\Models\Desktop;
use App\Models\Employee;

it('can create a desktop - BDD 13', function () {
    $desktopData = [
        'full_number_identifier' => '12345',
        'pc_number' => 'PC001',
        'location' => 'ghh',
        'side' => 'north',
        'double_pc' => false,
        'needs_dock' => true,
        'status' => 'static',
        'floor' => 1,
        'island_number' => 101,
        'workspace_type' => 'developer',
        'q1' => false,
    ];

    $this->post(route('equipment.storeDesktop'), $desktopData);
    $this->assertDatabaseHas('desktops', $desktopData);
});

it('can search a desktop - BDD 21', function () {
    $desktopData = [
        'full_number_identifier' => '12345',
        'pc_number' => 'PC001',
        'location' => 'ghh',
        'side' => 'north',
        'double_pc' => false,
        'needs_dock' => true,
        'status' => 'static',
        'floor' => 1,
        'island_number' => 101,
        'workspace_type' => 'developer',
        'q1' => false,
    ];

    $this->post(route('equipment.storeDesktop'), $desktopData);
    $this->assertDatabaseHas('desktops', $desktopData);

    $response = $this->get('/equipment/desktops?search=PC001');
    $response->assertStatus(200);
    $response->assertSee('PC001');
});

it('can display desktops - BDD 12', function () {
    Desktop::factory()->count(3)->create();

    $response = $this->get(route('equipment.desktops'));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('Equipment/Desktop/index')
                ->has('desktops.data', 3)
                ->has(
                    'desktops.data.0',
                    fn ($page) => $page
                        ->where('id', fn ($value) => is_numeric($value))
                        ->where('full_number_identifier', fn ($value) => is_string($value))
                        ->where('pc_number', fn ($value) => is_string($value))
                        ->etc()
                )
        );
});

it('can update the full number identifier of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => '54321',
        'pc_number' => $desktop->pc_number,
        'location' => $desktop->location,
        'side' => $desktop->side,
        'double_pc' => $desktop->double_pc,
        'needs_dock' => $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => $desktop->floor,
        'island_number' => $desktop->island_number,
        'workspace_type' => $desktop->workspace_type,
        'q1' => $desktop->q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the PC number of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $desktop->full_number_identifier,
        'pc_number' => 'PC002',
        'location' => $desktop->location,
        'side' => $desktop->side,
        'double_pc' => $desktop->double_pc,
        'needs_dock' => $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => $desktop->floor,
        'island_number' => $desktop->island_number,
        'workspace_type' => $desktop->workspace_type,
        'q1' => $desktop->q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the location of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $desktop->full_number_identifier,
        'pc_number' => $desktop->pc_number,
        'location' => $desktop->location === 'ghh' ? 'waagstraat' : 'ghh',
        'side' => $desktop->side,
        'double_pc' => $desktop->double_pc,
        'needs_dock' => $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => $desktop->floor,
        'island_number' => $desktop->island_number,
        'workspace_type' => $desktop->workspace_type,
        'q1' => $desktop->q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the side of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $desktop->full_number_identifier,
        'pc_number' => $desktop->pc_number,
        'location' => $desktop->location,
        'side' => 'south',
        'double_pc' => $desktop->double_pc,
        'needs_dock' => $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => $desktop->floor,
        'island_number' => $desktop->island_number,
        'workspace_type' => $desktop->workspace_type,
        'q1' => $desktop->q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the floor of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $desktop->full_number_identifier,
        'pc_number' => $desktop->pc_number,
        'location' => $desktop->location,
        'side' => $desktop->side,
        'double_pc' => $desktop->double_pc,
        'needs_dock' => $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => 2,
        'island_number' => $desktop->island_number,
        'workspace_type' => $desktop->workspace_type,
        'q1' => $desktop->q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the island number of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $desktop->full_number_identifier,
        'pc_number' => $desktop->pc_number,
        'location' => $desktop->location,
        'side' => $desktop->side,
        'double_pc' => $desktop->double_pc,
        'needs_dock' => $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => $desktop->floor,
        'island_number' => 102,
        'workspace_type' => $desktop->workspace_type,
        'q1' => $desktop->q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the double PC flag of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $desktop->full_number_identifier,
        'pc_number' => $desktop->pc_number,
        'location' => $desktop->location,
        'side' => $desktop->side,
        'double_pc' => ! $desktop->double_pc,
        'needs_dock' => $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => $desktop->floor,
        'island_number' => $desktop->island_number,
        'workspace_type' => $desktop->workspace_type,
        'q1' => $desktop->q1,
    ];
    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the needs dock flag of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $desktop->full_number_identifier,
        'pc_number' => $desktop->pc_number,
        'location' => $desktop->location,
        'side' => $desktop->side,
        'double_pc' => $desktop->double_pc,
        'needs_dock' => ! $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => $desktop->floor,
        'island_number' => $desktop->island_number,
        'workspace_type' => $desktop->workspace_type,
        'q1' => $desktop->q1,
    ];
    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the workspace type of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $desktop->full_number_identifier,
        'pc_number' => $desktop->pc_number,
        'location' => $desktop->location,
        'side' => $desktop->side,
        'double_pc' => $desktop->double_pc,
        'needs_dock' => $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => $desktop->floor,
        'island_number' => $desktop->island_number,
        'workspace_type' => $desktop->workspace_type === 'developer' ? 'non-developer' : 'developer',
        'q1' => $desktop->q1,
    ];
    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the updated in Q1 flag of a desktop - BDD 14', function () {
    $desktop = Desktop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $desktop->full_number_identifier,
        'pc_number' => $desktop->pc_number,
        'location' => $desktop->location,
        'side' => $desktop->side,
        'double_pc' => $desktop->double_pc,
        'needs_dock' => $desktop->needs_dock,
        'status' => $desktop->status,
        'floor' => $desktop->floor,
        'island_number' => $desktop->island_number,
        'workspace_type' => $desktop->workspace_type,
        'q1' => ! $desktop->q1,
    ];
    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can assign a desktop to an employee - BDD 16', function () {
    $employeeData = [
        'first_name' => 'Test',
        'last_name' => 'Employee',
    ];
    $employee = Employee::create($employeeData);
    $desktopData = [
        'full_number_identifier' => '12345',
        'pc_number' => 'PC001',
        'location' => 'ghh',
        'side' => 'north',
        'double_pc' => false,
        'needs_dock' => true,
        'status' => 'static',
        'floor' => 1,
        'island_number' => 101,
        'workspace_type' => 'developer',
        'q1' => false,
    ];

    $desktop = Desktop::create($desktopData);

    $this->post(route('equipment.storeDesktop'), $desktopData);
    $this->assertDatabaseHas('desktops', $desktopData);

    $desktop->update(['employee_id' => $employee->id]);
    $this->assertEquals($employee->id, $desktop->employee_id);

});

it('can unassign a desktop from an employee - BDD 18', function () {
    $employeeData = [
        'first_name' => 'Test',
        'last_name' => 'Employee',
    ];
    $employee = Employee::create($employeeData);
    $desktopData = [
        'full_number_identifier' => '12345',
        'pc_number' => 'PC001',
        'location' => 'ghh',
        'side' => 'north',
        'double_pc' => false,
        'needs_dock' => true,
        'status' => 'static',
        'floor' => 1,
        'island_number' => 101,
        'workspace_type' => 'developer',
        'q1' => false,
    ];

    $desktop = Desktop::create($desktopData);
    $this->post(route('equipment.storeDesktop'), $desktopData);
    $this->assertDatabaseHas('desktops', $desktopData);

    $desktop->update(['employee_id' => $employee->id]);
    $this->assertEquals($employee->id, $desktop->employee_id);

    $desktop->update(['employee_id' => null]);
    $this->assertNull($desktop->employee_id);

});

it('can delete a desktop - BDD 15', function () {
    $desktop = Desktop::factory()->create();
    $this->delete(route('equipment.destroyDesktop', $desktop));
    $this->assertDatabaseMissing('desktops', ['id' => $desktop->id]);
});
