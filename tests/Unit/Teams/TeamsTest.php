<?php

use App\Models\Team;

test('can create a team', function () {
    $teamData = [
        'team_name' => 'Test Team',
        'description' => 'This is a test team',
    ];

    $team = Team::create($teamData);

    expect($team)->toBeInstanceOf(Team::class);
    expect($team->team_name)->toBe('Test Team');
    expect($team->description)->toBe('This is a test team');
});

test('can read a team', function () {
    $team = Team::factory()->create();

    $foundTeam = Team::find($team->id);

    expect($foundTeam)->toBeInstanceOf(Team::class);
    expect($foundTeam->name)->toBe($team->name);
    expect($foundTeam->description)->toBe($team->description);
});

test('can update a team', function () {
    $team = Team::factory()->create();

    $updatedData = [
        'team_name' => 'Updated Team',
        'description' => 'This is an updated team',
    ];

    $team->update($updatedData);

    expect($team->team_name)->toBe('Updated Team');
    expect($team->description)->toBe('This is an updated team');
});

test('can delete a team', function () {
    $team = Team::factory()->create();

    $team->delete();

    expect(Team::find($team->id))->toBeNull();
});
