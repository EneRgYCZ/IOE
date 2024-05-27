<?php

namespace Tests\Unit\Equipment;

use App\Models\Desktop;

it('can create a desktop', function () {
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
        'updated_in_q1' => false,
    ];

    $this->post(route('equipment.storeDesktop'), $desktopData);
    $this->assertDatabaseHas('desktops', $desktopData);
});

it('can display desktops', function () {
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

it('can update the full number identifier of a desktop', function () {
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
        'updated_in_q1' => $desktop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the PC number of a desktop', function () {
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
        'updated_in_q1' => $desktop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the location of a desktop', function () {
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
        'updated_in_q1' => $desktop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the side of a desktop', function () {
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
        'updated_in_q1' => $desktop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the floor of a desktop', function () {
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
        'updated_in_q1' => $desktop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the island number of a desktop', function () {
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
        'updated_in_q1' => $desktop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the double PC flag of a desktop', function () {
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
        'updated_in_q1' => $desktop->updated_in_q1,
    ];
    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the needs dock flag of a desktop', function () {
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
        'updated_in_q1' => $desktop->updated_in_q1,
    ];
    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the workspace type of a desktop', function () {
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
        'updated_in_q1' => $desktop->updated_in_q1,
    ];
    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can update the updated in Q1 flag of a desktop', function () {
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
        'updated_in_q1' => ! $desktop->updated_in_q1,
    ];
    $this->patch(route('equipment.updateDesktop', $desktop), $updatedData);
    $this->assertDatabaseHas('desktops', $updatedData);
});

it('can delete a desktop', function () {
    $desktop = Desktop::factory()->create();
    $this->delete(route('equipment.destroyDesktop', $desktop));
    $this->assertDatabaseMissing('desktops', ['id' => $desktop->id]);
});
