<?php

use App\Models\Employee;
use App\Models\Team;

const TEAM_NAME = 'Test Team';
const TEAM_DESCRIPTION = 'This is a test team';
const UPDATED_TEAM_NAME = 'Updated Team';
const UPDATED_TEAM_DESCRIPTION = 'This is an updated team';

const TEST_TEAM_A_NAME = 'Team A';
const TEST_TEAM_A_DESCRIPTION = 'Test DescriptionA';
const TEST_TEAM_B_NAME = 'Team B';
const TEST_TEAM_B_DESCRIPTION = 'Test DescriptionB';
const TEST_TEAM_C_NAME = 'Team C';
const TEST_TEAM_C_DESCRIPTION = 'Test DescriptionC';

test('can display the teams - BDD1', function () {
    $team = Team::factory()->create();

    $response = $this->get(route('teams.index'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn ($page) => $page
            ->component('Teams/index')
            ->has('teams.data', 1)
            ->has(
                'teams.data.0',
                fn ($page) => $page
                    ->where('team_name', $team->team_name)
                    ->where('description', $team->description)
                    ->etc()
            )
    );
});

test('can create a team - BDD 3', function () {
    $teamData = [
        'team_name' => TEST_TEAM_A_NAME,
        'description' => TEST_TEAM_A_DESCRIPTION,
    ];

    $team = Team::create($teamData);

    expect($team)->toBeInstanceOf(Team::class);
    expect($team->team_name)->toBe('Team A');
    expect($team->description)->toBe('Test DescriptionA');
});

test('can read a team - BDD 1', function () {
    $team = Team::factory()->create();

    $foundTeam = Team::find($team->id);

    expect($foundTeam)->toBeInstanceOf(Team::class);
    expect($foundTeam->name)->toBe($team->name);
    expect($foundTeam->description)->toBe($team->description);
});

test('can update a team - BDD 4', function () {
    $team = Team::factory()->create();

    $updatedData = [
        'team_name' => UPDATED_TEAM_NAME,
        'description' => UPDATED_TEAM_DESCRIPTION,
    ];

    $team->update($updatedData);

    expect($team->team_name)->toBe(UPDATED_TEAM_NAME);
    expect($team->description)->toBe(UPDATED_TEAM_DESCRIPTION);
});

test('can assign an employee to a team - BDD 5', function () {
    $employee = Employee::factory()->create();

    $teamData = [
        'team_name' => TEAM_NAME,
        'description' => TEAM_DESCRIPTION,
        'team_members' => [
            ['id' => $employee->id],
        ],
    ];

    $this->post(route('teams.store'), $teamData);
    $this->assertDatabaseHas('team_members', [
        'employee_id' => $employee->id,
    ]);

});

test('can unassign an employee from a team - BDD 6', function () {
    $employee = Employee::factory()->create();

    $teamData = [
        'team_name' => TEAM_NAME,
        'description' => TEAM_DESCRIPTION,
        'team_members' => [
            ['id' => $employee->id],
        ],
    ];

    $this->post(route('teams.store'), $teamData);

    $this->assertDatabaseHas('team_members', [
        'employee_id' => $employee->id,
    ]);

    $updatedData = [
        'team_name' => 'Updated Team',
        'description' => 'This is an updated team',
        'team_members' => [],
    ];

    $this->patch(route('teams.update', 1), $updatedData);

    $this->assertDatabaseMissing('team_members', [
        'employee_id' => $employee->id,
    ]);

});

test('can search for a team - BDD 21', function () {
    $teamData = [
        'team_name' => TEST_TEAM_A_NAME,
        'description' => TEST_TEAM_A_DESCRIPTION,
    ];
    Team::create($teamData);

    $response = $this->get('/teams?search=Test Team A');
    $response->assertStatus(200);
    $response->assertSee('Test Team A');

});

test('can sort teams by name in ascending order - BDD 22', function () {
    $teamData1 = [
        'team_name' => TEST_TEAM_A_NAME,
        'description' => TEST_TEAM_A_DESCRIPTION,
    ];
    $teamData2 = [
        'team_name' => TEST_TEAM_B_NAME,
        'description' => TEST_TEAM_B_DESCRIPTION,
    ];
    $teamData3 = [
        'team_name' => TEST_TEAM_C_NAME,
        'description' => TEST_TEAM_C_DESCRIPTION,
    ];

    Team::create($teamData1);
    Team::create($teamData2);
    Team::create($teamData3);

    $response = $this->get('/teams?sort=team_name');
    $response->assertSeeInOrder([TEST_TEAM_A_NAME, TEST_TEAM_B_NAME, TEST_TEAM_C_NAME]);

});

test('can sort teams by name in descending order - BDD 22', function () {
    $teamData1 = [
        'team_name' => TEST_TEAM_A_NAME,
        'description' => TEST_TEAM_A_DESCRIPTION,
    ];
    $teamData2 = [
        'team_name' => TEST_TEAM_B_NAME,
        'description' => TEST_TEAM_B_DESCRIPTION,
    ];
    $teamData3 = [
        'team_name' => TEST_TEAM_C_NAME,
        'description' => TEST_TEAM_C_DESCRIPTION,
    ];

    Team::create($teamData1);
    Team::create($teamData2);
    Team::create($teamData3);

    $response = $this->get('/teams?sort=-team_name');
    $response->assertSeeInOrder([TEST_TEAM_C_NAME, TEST_TEAM_B_NAME, TEST_TEAM_A_NAME]);

});
test('can sort teams by description in ascending order - BDD 22', function () {
    $teamData1 = [
        'team_name' => TEST_TEAM_A_NAME,
        'description' => TEST_TEAM_A_DESCRIPTION,
    ];
    $teamData2 = [
        'team_name' => TEST_TEAM_B_NAME,
        'description' => TEST_TEAM_B_DESCRIPTION,
    ];
    $teamData3 = [
        'team_name' => TEST_TEAM_C_NAME,
        'description' => TEST_TEAM_C_DESCRIPTION,
    ];

    Team::create($teamData1);
    Team::create($teamData2);
    Team::create($teamData3);

    $response = $this->get('/teams?sort=description');
    $response->assertSeeInOrder([TEST_TEAM_A_DESCRIPTION, TEST_TEAM_B_DESCRIPTION, TEST_TEAM_C_DESCRIPTION]);

});

test('can sort teams by description in descending order - BDD 22', function () {
    $teamData1 = [
        'team_name' => TEST_TEAM_A_NAME,
        'description' => TEST_TEAM_A_DESCRIPTION,
    ];
    $teamData2 = [
        'team_name' => TEST_TEAM_B_NAME,
        'description' => TEST_TEAM_B_DESCRIPTION,
    ];
    $teamData3 = [
        'team_name' => TEST_TEAM_C_NAME,
        'description' => TEST_TEAM_C_DESCRIPTION,
    ];

    Team::create($teamData1);
    Team::create($teamData2);
    Team::create($teamData3);

    $response = $this->get('/teams?sort=-description');
    $response->assertSeeInOrder([TEST_TEAM_C_DESCRIPTION, TEST_TEAM_B_DESCRIPTION, TEST_TEAM_A_DESCRIPTION]);

});

test('can delete a team - BDD 7', function () {
    $team = Team::factory()->create();

    $team->delete();

    expect(Team::find($team->id))->toBeNull();
});
