<?php

use App\Models\Employee;

it('can create an employee', function () {
    $employeeData = [
        'first_name' => 'John',
        'last_name' => 'Doe',
    ];

    $response = $this->post(route('employees.store'), $employeeData);

    $response->assertRedirect(route('employees.index'));
    $this->assertDatabaseHas('employees', $employeeData);
});

it('can display the employees', function () {
    $employee = Employee::factory()->create();

    $response = $this->get(route('employees.index'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn ($page) => $page
            ->component('Employees/index')
            ->has('employees.data', 1)
            ->has(
                'employees.data.0',
                fn ($page) => $page
                    ->where('id', $employee->id)
                    ->where('first_name', $employee->first_name)
                    ->where('last_name', $employee->last_name)
                    ->etc()
            )
    );
});

it('can update an employee', function () {
    $employee = Employee::factory()->create();

    $updatedData = [
        'first_name' => 'Jane',
        'last_name' => 'Smith',
    ];

    $response = $this->patch(route('employees.update', $employee), $updatedData);

    $response->assertRedirect(route('employees.index'));
    $this->assertDatabaseHas('employees', $updatedData);
});

it('can delete an employee', function () {
    $employee = Employee::factory()->create();

    $response = $this->delete(route('employees.destroy', $employee));

    $response->assertRedirect(route('employees.index'));
    $this->assertDatabaseMissing('employees', ['id' => $employee->id]);
});
