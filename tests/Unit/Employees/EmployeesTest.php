<?php

use App\Models\Employee;

it('can create an employee', function () {
    $employeeData = [
        'first_name' => 'John',
        'last_name' => 'Doe',
    ];

    $this->post(route('employees.store'), $employeeData);

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

    $this->patch(route('employees.update', $employee), $updatedData);

    $this->assertDatabaseHas('employees', $updatedData);
});

it('can search for an employee', function () {
    $employeeData = [
        'first_name' => 'testFirstName',
        'last_name' => 'testLastName',
    ];
    Employee::create($employeeData);

    $response = $this->get('/employees?search=testFirstName');
    $response->assertStatus(200);
    $response->assertSee('testFirstName');
});

it('can sort employees by first name in ascending order', function () {
    $employeeData = [
        'first_name' => 'Abby',
        'last_name' => 'Abigail',
    ];
    $employeeData2 = [
        'first_name' => 'Bobby',
        'last_name' => 'Basher',
    ];
    $employeeData3 = [
        'first_name' => 'Cathy',
        'last_name' => 'Katherine',
    ];

    Employee::create($employeeData);
    Employee::create($employeeData2);
    Employee::create($employeeData3);

    $response = $this->get('/employees');

    $response = $this->get('/employees?sort=first_name');
    $response->assertSeeInOrder(['Abby', 'Bobby', 'Cathy']);
});

it('can sort employees by first name in descending order', function () {
    $employeeData = [
        'first_name' => 'Abby',
        'last_name' => 'Abigail',
    ];
    $employeeData2 = [
        'first_name' => 'Bobby',
        'last_name' => 'Basher',
    ];
    $employeeData3 = [
        'first_name' => 'Cathy',
        'last_name' => 'Katherine',
    ];

    Employee::create($employeeData);
    Employee::create($employeeData2);
    Employee::create($employeeData3);

    $response = $this->get('/employees');

    $response = $this->get('/employees?sort=-first_name');
    $response->assertSeeInOrder(['Cathy', 'Bobby', 'Abby']);
});

it('can sort employees by last name in ascending order', function () {
    $employeeData = [
        'first_name' => 'Abby',
        'last_name' => 'Abigail',
    ];
    $employeeData2 = [
        'first_name' => 'Bobby',
        'last_name' => 'Basher',
    ];
    $employeeData3 = [
        'first_name' => 'Cathy',
        'last_name' => 'Katherine',
    ];

    Employee::create($employeeData);
    Employee::create($employeeData2);
    Employee::create($employeeData3);

    $response = $this->get('/employees');

    $response = $this->get('/employees?sort=last_name');
    $response->assertSeeInOrder(['Abigail', 'Basher', 'Katherine']);
});

it('can sort employees by last name in descending order', function () {
    $employeeData1 = [
        'first_name' => 'Abby',
        'last_name' => 'Abigail',
    ];
    $employeeData2 = [
        'first_name' => 'Bobby',
        'last_name' => 'Basher',
    ];
    $employeeData3 = [
        'first_name' => 'Cathy',
        'last_name' => 'Katherine',
    ];

    Employee::create($employeeData1);
    Employee::create($employeeData2);
    Employee::create($employeeData3);

    $response = $this->get('/employees');

    $response = $this->get('/employees?sort=l-ast_name');
    $response->assertSeeInOrder(['Katherine', 'Basher', 'Abigail']);
});

it('can delete an employee', function () {
    $employee = Employee::factory()->create();

    $this->delete(route('employees.destroy', $employee));

    $this->assertDatabaseMissing('employees', ['id' => $employee->id]);
});
