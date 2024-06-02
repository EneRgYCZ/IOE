<?php

namespace Tests\Unit\Equipment;

use App\Models\Desktop;
use App\Models\Employee;

const DESKTOP_DATA = [
    'full_number_identifier' => '12345',
    'pc_number' => 'PC001',
    'location' => 'GHH',
    'side' => 'North',
    'double_pc' => false,
    'needs_dock' => true,
    'status' => 'static',
    'floor' => 1,
    'island_number' => 101,
    'workspace_type' => 'Developer',
    'q1' => false,
];

const DESKTOP_DATA2 = [
    'full_number_identifier' => '22345',
    'pc_number' => 'PC002',
    'location' => 'GHH',
    'side' => 'North',
    'double_pc' => false,
    'needs_dock' => true,
    'status' => 'static',
    'floor' => 2,
    'island_number' => 201,
    'workspace_type' => 'Developer',
    'q1' => false,
];

const DESKTOP_DATA3 = [
    'full_number_identifier' => '32345',
    'pc_number' => 'PC003',
    'location' => 'Waagstraat',
    'side' => 'South',
    'double_pc' => true,
    'needs_dock' => false,
    'status' => 'static',
    'floor' => 3,
    'island_number' => 301,
    'workspace_type' => 'Non-developer',
    'q1' => true,
];

it('can create a desktop - BDD 13', function () {
    $desktopData = DESKTOP_DATA;

    $this->post(route('equipment.storeDesktop'), $desktopData);
    $this->assertDatabaseHas('desktops', $desktopData);
});

it('can search a desktop - BDD 21', function () {
    $desktopData = DESKTOP_DATA;

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
        'location' => $desktop->location === 'GHH' ? 'Waagstraat' : 'GHH',
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
        'side' => 'South',
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
        'workspace_type' => $desktop->workspace_type === 'Developer' ? 'Non-developer' : 'Developer',
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
    $desktopData = DESKTOP_DATA;

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
    $desktopData = DESKTOP_DATA;

    $desktop = Desktop::create($desktopData);
    $this->post(route('equipment.storeDesktop'), $desktopData);
    $this->assertDatabaseHas('desktops', $desktopData);

    $desktop->update(['employee_id' => $employee->id]);
    $this->assertEquals($employee->id, $desktop->employee_id);

    $desktop->update(['employee_id' => null]);
    $this->assertNull($desktop->employee_id);

});

it('can sort desktops by ID in ascending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=full_number_identifier');
    $response->assertSeeInOrder(['12345', '22345', '32345']);
});

it('can sort desktops by ID in descending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=-full_number_identifier');
    $response->assertSeeInOrder(['32345', '22345', '12345']);
});

it('can sort desktops by PC Number in ascending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=pc_number');
    $response->assertSeeInOrder(['PC001', 'PC002', 'PC003']);
});

it('can sort desktops by PC Number in descending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=-pc_number');
    $response->assertSeeInOrder(['PC003', 'PC002', 'PC001']);
});

it('can sort desktops by Location in ascending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=location');
    $response->assertSeeInOrder(['GHH', 'GHH', 'Waagstraat']);
});

it('can sort desktops by Location in descending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=-location');
    $response->assertSeeInOrder(['Waagstraat', 'GHH', 'GHH']);
});
it('can sort desktops by side in ascending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=side');
    $response->assertSeeInOrder(['North', 'North', 'South']);
});

it('can sort desktops by side in descending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=-side');
    $response->assertSeeInOrder(['South', 'North', 'North']);
});

it('can sort desktops by Needs Dock in ascending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=needs_dock');
    $response->assertSeeInOrder(['false', 'false', 'true']);
});

it('can sort desktops by Needs Dock in descending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=-needs_dock');
    $response->assertSeeInOrder(['true', 'true', 'false']);
});
it('can sort desktops by Floor in ascending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=floor');
    $response->assertSeeInOrder(['1', '2', '3']);
});

it('can sort desktops by Floor in descending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=-floor');
    $response->assertSeeInOrder(['3', '2', '1']);
});

it('can sort desktops by Q1 in ascending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=q1');
    $response->assertSeeInOrder(['false', 'false', 'true']);
});

it('can sort desktops by Q1 in descending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=-q1');
    $response->assertSeeInOrder(['true', 'false', 'false']);
});

it('can sort desktops by Workspace Type in ascending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=workspace_type');
    $response->assertSeeInOrder(['Developer', 'Developer', 'Non-developer']);
});

it('can sort desktops by Workspace Type in descending order - BDD 22', function () {
    $desktop1 = DESKTOP_DATA;
    $desktop2 = DESKTOP_DATA2;
    $desktop3 = DESKTOP_DATA3;

    Desktop::create($desktop1);
    Desktop::create($desktop2);
    Desktop::create($desktop3);

    $response = $this->get('/equipment/desktops?sort=-workspace_type');
    $response->assertSeeInOrder(['Non-developer', 'Developer', 'Developer']);
});

it('can delete a desktop - BDD 15', function () {
    $desktop = Desktop::factory()->create();
    $this->delete(route('equipment.destroyDesktop', $desktop));
    $this->assertDatabaseMissing('desktops', ['id' => $desktop->id]);
});
