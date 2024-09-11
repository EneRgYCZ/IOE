<?php

namespace Tests\Unit\Equipment;

use App\Models\Employee;
use App\Models\Laptop;

const LAPTOP_DATA = [
    'full_number_identifier' => 'L12345',
    'laptop_number' => 'L001',
    'location' => 'Unit 1',
    'side' => 'Right',
    'status' => 'static',
    'floor' => 1,
    'island_number' => 102,
    'workspace_type' => 'Non-developer',
    'q1' => true,
];
const LAPTOP_DATA2 = [
    'full_number_identifier' => 'L22345',
    'laptop_number' => 'L002',
    'location' => 'Unit 1',
    'side' => 'Right',
    'status' => 'static',
    'floor' => 2,
    'island_number' => 202,
    'workspace_type' => 'Non-developer',
    'q1' => true,
];
const LAPTOP_DATA3 = [
    'full_number_identifier' => 'L32345',
    'laptop_number' => 'L003',
    'location' => 'Unit 2',
    'side' => 'Left',
    'status' => 'static',
    'floor' => 3,
    'island_number' => 302,
    'workspace_type' => 'Developer',
    'q1' => false,
];

it('can create a laptop - BDD 13', function () {
    $laptopData = LAPTOP_DATA;

    $this->post(route('equipment.storeLaptop'), $laptopData);
    $this->assertDatabaseHas('laptops', $laptopData);
});

it('can sort laptops by ID in ascending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=full_number_identifier');
    $response->assertSeeInOrder(['L12345', 'L22345', 'L32345']);
});

it('can sort laptops by ID in descending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=-full_number_identifier');
    $response->assertSeeInOrder(['L32345', 'L22345', 'L12345']);
});
it('can sort laptops by laptop number in ascending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=laptop_number');
    $response->assertSeeInOrder(['L001', 'L002', 'L003']);
});

it('can sort laptops by laptop number in descending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=-laptop_number');
    $response->assertSeeInOrder(['L003', 'L002', 'L001']);
});

it('can sort laptops by location in ascending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=location');
    $response->assertSeeInOrder(['Unit 1', 'Unit 1', 'Unit 2']);
});

it('can sort laptops by location in descending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=-location');
    $response->assertSeeInOrder(['Unit 2', 'Unit 1', 'Unit 1']);
});

it('can sort laptops by side in ascending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=side');
    $response->assertSeeInOrder(['Left', 'Right', 'Right']);
});

it('can sort laptops by side in descending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=-side');
    $response->assertSeeInOrder(['Right', 'Right', 'Left']);
});

it('can sort laptops by floor in ascending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=floor');
    $response->assertSeeInOrder(['1', '2', '3']);
});

it('can sort laptops by floor in descending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=-floor');
    $response->assertSeeInOrder(['3', '2', '1']);
});

it('can sort laptops by Q1 in ascending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=q1');
    $response->assertSeeInOrder(['true', 'true', 'false']);
});

it('can sort laptops by Q1 in descending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=-q1');
    $response->assertSeeInOrder(['false', 'true', 'true']);
});

it('can sort laptops by island number in ascending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=island_number');
    $response->assertSeeInOrder(['102', '202', '302']);
});

it('can sort laptops by Island Number in descending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=-island_number');
    $response->assertSeeInOrder(['302', '202', '102']);
});

it('can sort laptops by workspace type in ascending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=workspace_type');
    $response->assertSeeInOrder(['Developer', 'Non-developer', 'Non-developer']);
});

it('can sort laptops by workspace type in descending order - BDD 22', function () {
    $laptop1 = LAPTOP_DATA;
    $laptop2 = LAPTOP_DATA2;
    $laptop3 = LAPTOP_DATA3;

    Laptop::create($laptop1);
    Laptop::create($laptop2);
    Laptop::create($laptop3);

    $response = $this->get('/equipment/laptops?sort=-workspace_type');
    $response->assertSeeInOrder(['Non-developer', 'Non-developer', 'Developer']);
});
it('can search a laptop - BDD 21', function () {
    $laptopData = LAPTOP_DATA;

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
        'location' => $laptop->location === 'Unit 1' ? 'Unit 2' : 'Unit 1',
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
        'side' => 'Left',
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
    $laptopData = LAPTOP_DATA;

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
    $laptopData = LAPTOP_DATA;

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
