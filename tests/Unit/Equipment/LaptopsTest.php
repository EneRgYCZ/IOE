<?php

namespace Tests\Unit\Equipment;

use App\Models\Employee;
use App\Models\Laptop;

it('can create a laptop - BDD 13', function () {
    $laptopData = [
        'full_number_identifier' => 'L12345',
        'laptop_number' => 'L001',
        'location' => 'ghh',
        'side' => 'north',
        'status' => 'static',
        'floor' => 2,
        'island_number' => 102,
        'workspace_type' => 'non-developer',
        'q1' => true,
    ];

    $this->post(route('equipment.storeLaptop'), $laptopData);
    $this->assertDatabaseHas('laptops', $laptopData);
});

it('can search a laptop - BDD 21', function () {
    $laptopData = [
        'full_number_identifier' => 'L12345',
        'laptop_number' => 'L001',
        'location' => 'ghh',
        'side' => 'north',
        'status' => 'static',
        'floor' => 2,
        'island_number' => 102,
        'workspace_type' => 'non-developer',
        'q1' => true,
    ];

    $this->post(route('equipment.storeLaptop'), $laptopData);
    $this->assertDatabaseHas('laptops', $laptopData);

    $response = $this->get('/equipment/laptops?search=L12345');
    $response->assertStatus(200);
    $response->assertSee('L12345');
});

it('can display laptops - BDD 12', function () {
    Laptop::factory()->count(3)->create();

    $response = $this->get(route('equipment.laptops'));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('Equipment/Laptop/index')
                ->has('laptops.data', 3)
                ->has(
                    'laptops.data.0',
                    fn ($page) => $page
                        ->where('id', fn ($value) => is_numeric($value))
                        ->where('full_number_identifier', fn ($value) => is_string($value))
                        ->where('laptop_number', fn ($value) => is_string($value))
                        ->etc()
                )
        );
});

it('can update the full number identifier of a laptop - BDD 14', function () {
    $laptop = Laptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => 'L54321',
        'laptop_number' => $laptop->laptop_number,
        'location' => $laptop->location,
        'side' => $laptop->side,
        'floor' => $laptop->floor,
        'island_number' => $laptop->island_number,
        'status' => $laptop->status,
    ];

    $this->patch(route('equipment.updateLaptop', $laptop), $updatedData);
    $this->assertDatabaseHas('laptops', $updatedData);
});

it('can update the laptop number of a laptop - BDD 14', function () {
    $laptop = Laptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $laptop->full_number_identifier,
        'laptop_number' => 'L002',
        'location' => $laptop->location,
        'side' => $laptop->side,
        'floor' => $laptop->floor,
        'island_number' => $laptop->island_number,
        'status' => $laptop->status,
    ];

    $this->patch(route('equipment.updateLaptop', $laptop), $updatedData);
    $this->assertDatabaseHas('laptops', $updatedData);
});

it('can update the location of a laptop - BDD 14', function () {
    $laptop = Laptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $laptop->full_number_identifier,
        'laptop_number' => $laptop->laptop_number,
        'location' => $laptop->location === 'ghh' ? 'waagstraat' : 'ghh',
        'side' => $laptop->side,
        'floor' => $laptop->floor,
        'island_number' => $laptop->island_number,
        'status' => $laptop->status,
    ];

    $this->patch(route('equipment.updateLaptop', $laptop), $updatedData);
    $this->assertDatabaseHas('laptops', $updatedData);
});

it('can update the side of a laptop - BDD 14', function () {
    $laptop = Laptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $laptop->full_number_identifier,
        'laptop_number' => $laptop->laptop_number,
        'location' => $laptop->location,
        'side' => 'south',
        'floor' => $laptop->floor,
        'island_number' => $laptop->island_number,
        'status' => $laptop->status,
    ];

    $this->patch(route('equipment.updateLaptop', $laptop), $updatedData);
    $this->assertDatabaseHas('laptops', $updatedData);
});

it('can update the floor of a laptop - BDD 14', function () {
    $laptop = Laptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $laptop->full_number_identifier,
        'laptop_number' => $laptop->laptop_number,
        'location' => $laptop->location,
        'side' => $laptop->side,
        'floor' => 3,
        'island_number' => $laptop->island_number,
        'status' => $laptop->status,
    ];

    $this->patch(route('equipment.updateLaptop', $laptop), $updatedData);
    $this->assertDatabaseHas('laptops', $updatedData);
});

it('can update the island number of a laptop - BDD 14', function () {
    $laptop = Laptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $laptop->full_number_identifier,
        'laptop_number' => $laptop->laptop_number,
        'location' => $laptop->location,
        'side' => $laptop->side,
        'floor' => $laptop->floor,
        'island_number' => 103,
        'status' => $laptop->status,
    ];

    $this->patch(route('equipment.updateLaptop', $laptop), $updatedData);
    $this->assertDatabaseHas('laptops', $updatedData);
});

it('can update the status of a laptop - BDD 14', function () {
    $laptop = Laptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $laptop->full_number_identifier,
        'laptop_number' => $laptop->laptop_number,
        'location' => $laptop->location,
        'side' => $laptop->side,
        'floor' => $laptop->floor,
        'island_number' => $laptop->island_number,
        'status' => $laptop->location === 'flex' ? 'static' : 'flex',
    ];

    $this->patch(route('equipment.updateLaptop', $laptop), $updatedData);
    $this->assertDatabaseHas('laptops', $updatedData);
});

it('can assign a laptop to an employee - BDD 16', function () {
    $employeeData = [
        'first_name' => 'Test',
        'last_name' => 'Employee',
    ];
    $employee = Employee::create($employeeData);
    $laptopData = [
        'full_number_identifier' => 'L12345',
        'laptop_number' => 'L001',
        'location' => 'ghh',
        'side' => 'north',
        'status' => 'static',
        'floor' => 2,
        'island_number' => 102,
        'workspace_type' => 'non-developer',
        'q1' => true,
    ];

    $laptop = Laptop::create($laptopData);

    $this->post(route('equipment.storeLaptop'), $laptopData);
    $this->assertDatabaseHas('laptops', $laptopData);

    $laptop->update(['employee_id' => $employee->id]);
    $this->assertEquals($employee->id, $laptop->employee_id);

});

it('can unassign a laptop from an employee - BDD 18', function () {
    $employeeData = [
        'first_name' => 'Test',
        'last_name' => 'Employee',
    ];
    $employee = Employee::create($employeeData);
    $laptopData = [
        'full_number_identifier' => 'L12345',
        'laptop_number' => 'L001',
        'location' => 'ghh',
        'side' => 'north',
        'status' => 'static',
        'floor' => 2,
        'island_number' => 102,
        'workspace_type' => 'non-developer',
        'q1' => true,
    ];

    $laptop = Laptop::create($laptopData);

    $this->post(route('equipment.storeLaptop'), $laptopData);
    $this->assertDatabaseHas('laptops', $laptopData);

    $laptop->update(['employee_id' => $employee->id]);
    $this->assertEquals($employee->id, $laptop->employee_id);
    $laptop->update(['employee_id' => null]);
    $this->assertNull($laptop->employee_id);

});

it('can delete a laptop - BDD 15', function () {
    $laptop = Laptop::factory()->create();
    $this->delete(route('equipment.destroyLaptop', $laptop));
    $this->assertDatabaseMissing('laptops', ['id' => $laptop->id]);
});
