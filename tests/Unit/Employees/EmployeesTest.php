<?php

use App\Models\Desktop;
use App\Models\Employee;
use App\Models\Laptop;
use App\Models\Team;
use App\Models\TeamMember;

const TEST_EMPLOYEE = [
    'first_name' => 'John',
    'last_name' => 'Doe',
];
const TEST_EMPLOYEE2 = [
    'first_name' => 'Bobby',
    'last_name' => 'Basher',
];
const TEST_EMPLOYEE3 = [
    'first_name' => 'Cathy',
    'last_name' => 'Katherine',
];

const DESKTOP_DATA = [
    'full_number_identifier' => '12345',
    'pc_number' => 'PC001',
    'location' => 'Unit 1',
    'side' => 'Right',
    'double_pc' => false,
    'needs_dock' => true,
    'status' => 'static',
    'floor' => 1,
    'island_number' => 101,
    'workspace_type' => 'Developer',
    'updated_in_q1' => false,
];

const LAPTOP_DATA = [
    'full_number_identifier' => 'L12345',
    'laptop_number' => 'L001',
    'location' => 'Unit 1',
    'side' => 'Right',
    'status' => 'static',
    'floor' => 2,
    'island_number' => 102,
    'workspace_type' => 'Non-developer',
    'updated_in_q1' => true,
];

it('can create an employee - BDD 9', function () {
    $employeeData = TEST_EMPLOYEE;

    $this->post(route('employees.store'), $employeeData);

    $this->assertDatabaseHas('employees', $employeeData);
});

it('can display the employees - BDD 8', function () {
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

it('can update an employee  - BDD 10', function () {
    $employee = Employee::factory()->create();

    $updatedData = [
        'first_name' => 'Jane',
        'last_name' => 'Smith',
    ];

    $this->patch(route('employees.update', $employee), $updatedData);
    $this->assertDatabaseHas('employees', $updatedData);
});

it('can search for an employee - BDD 21', function () {
    $employeeData = TEST_EMPLOYEE;
    Employee::create($employeeData);

    $response = $this->get('/employees?search=testFirstName');
    $response->assertStatus(200);
    $response->assertSee('testFirstName');
});

it('can assign an employee to a team - BDD 5', function () {
    $employeeData = TEST_EMPLOYEE;
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

it('can unassign an employee from a team - BDD 6', function () {
    $employeeData = TEST_EMPLOYEE;
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

it('can assign desktop to an employee - BDD 16', function () {
    $employeeData = TEST_EMPLOYEE;
    $employee = Employee::create($employeeData);
    $desktopData = DESKTOP_DATA;
    $desktop = Desktop::create($desktopData);
    $employee->equipment_id = $desktop->id;

    $this->assertEquals($desktop->id, $employee->equipment_id);
});

it('can unassign desktop to an employee - BDD 18', function () {
    $employeeData = TEST_EMPLOYEE;
    $employee = Employee::create($employeeData);
    $desktopData = DESKTOP_DATA;
    $desktop = Desktop::create($desktopData);
    $employee->equipment_id = $desktop->id;

    $this->assertEquals($desktop->id, $employee->equipment_id);
    $employee->equipment_id = null;
    $this->assertNull($employee->equipment_id);
});

it('can assign laptop to an employee - BDD 16', function () {
    $employeeData = TEST_EMPLOYEE;
    $employee = Employee::create($employeeData);
    $laptopData = LAPTOP_DATA;

    $laptop = Laptop::create($laptopData);
    $employee->equipment_id = $laptop->id;

    $this->assertEquals($laptop->id, $employee->equipment_id);
});

it('can unassign laptop to an employee - BDD 18', function () {
    $employeeData = TEST_EMPLOYEE;
    $employee = Employee::create($employeeData);
    $laptopData = LAPTOP_DATA;

    $laptop = Laptop::create($laptopData);
    $employee->equipment_id = $laptop->id;

    $this->assertEquals($laptop->id, $employee->equipment_id);
    $employee->equipment_id = null;
    $this->assertNull($employee->equipment_id);
});

it('can sort employees by first name in ascending order - BDD 22', function () {
    $employeeData = TEST_EMPLOYEE;
    $employeeData2 = TEST_EMPLOYEE2;
    $employeeData3 = TEST_EMPLOYEE3;

    Employee::create($employeeData);
    Employee::create($employeeData2);
    Employee::create($employeeData3);

    $response = $this->get('/employees?sort=first_name');
    $response->assertSeeInOrder(['Bobby', 'Cathy', 'John']);
});

it('can sort employees by first name in descending order - BDD 22', function () {
    $employeeData = TEST_EMPLOYEE;
    $employeeData2 = TEST_EMPLOYEE2;
    $employeeData3 = TEST_EMPLOYEE3;

    Employee::create($employeeData);
    Employee::create($employeeData2);
    Employee::create($employeeData3);

    $response = $this->get('/employees?sort=-first_name');
    $response->assertSeeInOrder(['John', 'Cathy', 'Bobby']);
});

it('can sort employees by last name in ascending order - BDD 22', function () {
    $employeeData = TEST_EMPLOYEE;
    $employeeData2 = TEST_EMPLOYEE2;
    $employeeData3 = TEST_EMPLOYEE3;

    Employee::create($employeeData);
    Employee::create($employeeData2);
    Employee::create($employeeData3);

    $response = $this->get('/employees?sort=last_name');
    $response->assertSeeInOrder(['Basher', 'Doe', 'Katherine']);
});

it('can sort employees by last name in descending order - BDD 22', function () {
    $employeeData = TEST_EMPLOYEE;
    $employeeData2 = TEST_EMPLOYEE2;
    $employeeData3 = TEST_EMPLOYEE3;

    Employee::create($employeeData);
    Employee::create($employeeData2);
    Employee::create($employeeData3);

    $response = $this->get('/employees?sort=-last_name');
    $response->assertSeeInOrder(['Katherine', 'Doe', 'Basher']);
});

it('can delete an employee - BDD 11', function () {
    $employee = Employee::factory()->create();

    $this->delete(route('employees.destroy', $employee));
    $this->assertDatabaseMissing('employees', ['id' => $employee->id]);
});
