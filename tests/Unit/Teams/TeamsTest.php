<?php

use App\Models\Employee;
use App\Models\Team;

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
        'team_name' => 'Test Team',
        'description' => 'This is a test team',
    ];

    $team = Team::create($teamData);

    expect($team)->toBeInstanceOf(Team::class);
    expect($team->team_name)->toBe('Test Team');
    expect($team->description)->toBe('This is a test team');
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
        'team_name' => 'Updated Team',
        'description' => 'This is an updated team',
    ];

    $team->update($updatedData);

    expect($team->team_name)->toBe('Updated Team');
    expect($team->description)->toBe('This is an updated team');
});

test('can assign an employee to a team - BDD 5', function () {
    $employee = Employee::factory()->create();

    $teamData = [
        'team_name' => 'Test Team',
        'description' => 'This is a test team',
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
        'team_name' => 'Test Team',
        'description' => 'This is a test team',
        'team_members' => [
            ['id' => $employee->id],
        ],
    ];
    $team = Team::create($teamData);

    $this->post(route('teams.store'), $teamData);
    $this->assertDatabaseHas('team_members', [
        'employee_id' => $employee->id,
    ]);

    $updatedData = [
        'team_name' => 'Updated Team',
        'description' => 'This is an updated team',
        'team_members' => [],
    ];

    $this->patch(route('teams.update', $team), $updatedData);

    $this->assertDatabaseMissing('team_members', [
        'employee_id' => $employee->id,
    ]);

});

test('can search for a team - BDD 21', function () {
    $teamData = [
        'team_name' => 'Test Team A',
        'description' => 'Test Description',
    ];
    Team::create($teamData);

    $response = $this->get('/teams?search=Test Team A');
    $response->assertStatus(200);
    $response->assertSee('Test Team A');

});

test('can sort teams by name in ascending order - BDD 22', function () {
    $teamData1 = [
        'team_name' => 'Team A',
        'description' => 'Test Description',
    ];
    $teamData2 = [
        'team_name' => 'Team B',
        'description' => 'Test Description',
    ];
    $teamData3 = [
        'team_name' => 'Team C',
        'description' => 'Test Description',
    ];

    Team::create($teamData1);
    Team::create($teamData2);
    Team::create($teamData3);

    $response = $this->get('/teams?sort=team_name');
    $response->assertSeeInOrder(['Team A', 'Team B', 'Team C']);

});

test('can sort teams by name in descending order - BDD 22', function () {
    $teamData1 = [
        'team_name' => 'Team A',
        'description' => 'Test Description',
    ];
    $teamData2 = [
        'team_name' => 'Team B',
        'description' => 'Test Description',
    ];
    $teamData3 = [
        'team_name' => 'Team C',
        'description' => 'Test Description',
    ];

    Team::create($teamData1);
    Team::create($teamData2);
    Team::create($teamData3);

    $response = $this->get('/teams?sort=-team_name');
    $response->assertSeeInOrder(['Team C', 'Team B', 'Team A']);

});
test('can sort teams by description in ascending order - BDD 22', function () {
    $teamData1 = [
        'team_name' => 'Team A',
        'description' => 'Test DescriptionA',
    ];
    $teamData2 = [
        'team_name' => 'Team B',
        'description' => 'Test DescriptionB',
    ];
    $teamData3 = [
        'team_name' => 'Team C',
        'description' => 'Test DescriptionC',
    ];

    Team::create($teamData1);
    Team::create($teamData2);
    Team::create($teamData3);

    $response = $this->get('/teams?sort=description');
    $response->assertSeeInOrder(['Test DescriptionA', 'Test DescriptionB', 'Test DescriptionC']);

});

test('can sort teams by description in descending order - BDD 22', function () {
    $teamData1 = [
        'team_name' => 'Team A',
        'description' => 'Test DescriptionA',
    ];
    $teamData2 = [
        'team_name' => 'Team B',
        'description' => 'Test DescriptionB',
    ];
    $teamData3 = [
        'team_name' => 'Team C',
        'description' => 'Test DescriptionC',
    ];

    Team::create($teamData1);
    Team::create($teamData2);
    Team::create($teamData3);

    $response = $this->get('/teams?sort=-description');
    $response->assertSeeInOrder(['Test DescriptionC', 'Test DescriptionB', 'Test DescriptionA']);

});

test('can delete a team - BDD 7', function () {
    $team = Team::factory()->create();

    $team->delete();

    expect(Team::find($team->id))->toBeNull();
});
