<?php

use App\Models\Desktop;
use App\Models\Employee;
use App\Models\Laptop;
use App\Models\Team;
use App\Models\TeamMember;

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

it('can assign an employee to a team', function () {
    $employeeData = [
        'first_name' => 'testFirstName',
        'last_name' => 'testLastName',
    ];
    $employee = Employee::create($employeeData);

    $teamData = [
        'team_name' => 'Test Team',
        'description' => 'This is a test team',
        'team_members' => [
            ['id' => $employee->id],
        ],
    ];
    $team = Team::create($teamData);
    $teamMemberData = [
        'team_id' => $team->id,
        'employee_id' => $employee->id,
    ];
    $teamMember = TeamMember::create($teamMemberData);

    $this->assertEquals($team->id, $teamMember->team_id);
    $this->assertEquals($employee->id, $teamMember->employee_id);

});

it('can unassign an employee from a team', function () {
    $employeeData = [
        'first_name' => 'testFirstName',
        'last_name' => 'testLastName',
    ];
    $employee = Employee::create($employeeData);

    $teamData = [
        'team_name' => 'Test Team',
        'description' => 'This is a test team',
        'team_members' => [
            ['id' => $employee->id],
        ],
    ];
    $team = Team::create($teamData);
    $teamMemberData = [
        'team_id' => $team->id,
        'employee_id' => $employee->id,
    ];
    $teamMember = TeamMember::create($teamMemberData);

    $this->assertEquals($team->id, $teamMember->team_id);
    $this->assertEquals($employee->id, $teamMember->employee_id);

    $teamMember->delete();
    $this->assertNull(TeamMember::where('team_id', $team->id)->where('employee_id', $employee->id)->first());

});

it('can assign desktop to an employee', function () {
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
        'updated_in_q1' => false,
    ];
    $desktop = Desktop::create($desktopData);
    $employee->equipment_id = $desktop->id;

    $this->assertEquals($desktop->id, $employee->equipment_id);
});

it('can unassign desktop to an employee', function () {
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
        'updated_in_q1' => false,
    ];
    $desktop = Desktop::create($desktopData);
    $employee->equipment_id = $desktop->id;

    $this->assertEquals($desktop->id, $employee->equipment_id);
    $employee->equipment_id = null;
    $this->assertNull($employee->equipment_id);
});

it('can assign laptop to an employee', function () {
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
        'updated_in_q1' => true,
    ];

    $laptop = Laptop::create($laptopData);
    $employee->equipment_id = $laptop->id;

    $this->assertEquals($laptop->id, $employee->equipment_id);
});
it('can unassign laptop to an employee', function () {
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
        'updated_in_q1' => true,
    ];

    $laptop = Laptop::create($laptopData);
    $employee->equipment_id = $laptop->id;

    $this->assertEquals($laptop->id, $employee->equipment_id);
    $employee->equipment_id = null;
    $this->assertNull($employee->equipment_id);
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

    $response = $this->get('/employees?sort=-last_name');
    $response->assertSeeInOrder(['Katherine', 'Basher', 'Abigail']);
});

it('can delete an employee', function () {
    $employee = Employee::factory()->create();

    $this->delete(route('employees.destroy', $employee));

    $this->assertDatabaseMissing('employees', ['id' => $employee->id]);
});
