<?php

namespace Tests\Unit\Equipment;

use App\Models\MeetingRoomLaptop;

it('can create a meeting room laptop - BDD 13', function () {
    $meetingRoomLaptopData = [
        'full_number_identifier' => 'MR123',
        'laptop_number' => 'MR001',
        'location' => 'waagstraat',
        'side' => 'south',
        'floor' => 3,
        'room_number' => '300A',
        'updated_in_q1' => false,
    ];

    $this->post(route('equipment.storeMeetingRoomLaptop'), $meetingRoomLaptopData);
    $this->assertDatabaseHas('meeting_room_laptops', $meetingRoomLaptopData);
});
it('can search a meeting room laptop - BDD 21', function () {
    $meetingRoomLaptopData = [
        'full_number_identifier' => 'MR123',
        'laptop_number' => 'MR001',
        'location' => 'waagstraat',
        'side' => 'south',
        'floor' => 3,
        'room_number' => '300A',
        'updated_in_q1' => false,
    ];

    $response = $this->post(route('equipment.storeMeetingRoomLaptop'), $meetingRoomLaptopData);
    $this->assertDatabaseHas('meeting_room_laptops', $meetingRoomLaptopData);
    $response = $this->get('/equipment/meeting-room-laptops?search=MR123');
    $response->assertStatus(200);
    $response->assertSee('MR123');
});

it('can display meeting room laptops - BDD 12', function () {
    MeetingRoomLaptop::factory()->count(3)->create();

    $response = $this->get(route('equipment.meeting-room-laptops'));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('Equipment/MeetingRoomLaptop/index')
                ->has('meetingRoomLaptops.data', 3)
                ->has(
                    'meetingRoomLaptops.data.0',
                    fn ($page) => $page
                        ->where('id', fn ($value) => is_numeric($value))
                        ->where('full_number_identifier', fn ($value) => is_string($value))
                        ->where('laptop_number', fn ($value) => is_string($value))
                        ->etc()
                )
        );
});

it('can update the full number identifier of a meeting room laptop - BDD 14', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => 'MR456',
        'laptop_number' => $meetingRoomLaptop->laptop_number,
        'location' => $meetingRoomLaptop->location,
        'side' => $meetingRoomLaptop->side,
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => $meetingRoomLaptop->room_number,
        'updated_in_q1' => $meetingRoomLaptop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateMeetingRoomLaptop', $meetingRoomLaptop), $updatedData);
    $this->assertDatabaseHas('meeting_room_laptops', $updatedData);
});

it('can update the laptop number of a meeting room laptop - BDD 14', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $meetingRoomLaptop->full_number_identifier,
        'laptop_number' => 'MR002',
        'location' => $meetingRoomLaptop->location,
        'side' => $meetingRoomLaptop->side,
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => $meetingRoomLaptop->room_number,
        'updated_in_q1' => $meetingRoomLaptop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateMeetingRoomLaptop', $meetingRoomLaptop), $updatedData);
    $this->assertDatabaseHas('meeting_room_laptops', $updatedData);
});

it('can update the location of a meeting room laptop - BDD 14', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $meetingRoomLaptop->full_number_identifier,
        'laptop_number' => $meetingRoomLaptop->laptop_number,
        'location' => $meetingRoomLaptop->location === 'ghh' ? 'waagstraat' : 'ghh',
        'side' => $meetingRoomLaptop->side,
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => $meetingRoomLaptop->room_number,
        'updated_in_q1' => $meetingRoomLaptop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateMeetingRoomLaptop', $meetingRoomLaptop), $updatedData);
    $this->assertDatabaseHas('meeting_room_laptops', $updatedData);
});

it('can update the side of a meeting room laptop - BDD 14', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $meetingRoomLaptop->full_number_identifier,
        'laptop_number' => $meetingRoomLaptop->laptop_number,
        'location' => $meetingRoomLaptop->location,
        'side' => 'north',
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => $meetingRoomLaptop->room_number,
        'updated_in_q1' => $meetingRoomLaptop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateMeetingRoomLaptop', $meetingRoomLaptop), $updatedData);
    $this->assertDatabaseHas('meeting_room_laptops', $updatedData);
});

it('can update the floor of a meeting room laptop - BDD 14', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $meetingRoomLaptop->full_number_identifier,
        'laptop_number' => $meetingRoomLaptop->laptop_number,
        'location' => $meetingRoomLaptop->location,
        'side' => $meetingRoomLaptop->side,
        'floor' => 4,
        'room_number' => $meetingRoomLaptop->room_number,
        'updated_in_q1' => $meetingRoomLaptop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateMeetingRoomLaptop', $meetingRoomLaptop), $updatedData);
    $this->assertDatabaseHas('meeting_room_laptops', $updatedData);
});

it('can update the room number of a meeting room laptop - BDD 14/17', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $meetingRoomLaptop->full_number_identifier,
        'laptop_number' => $meetingRoomLaptop->laptop_number,
        'location' => $meetingRoomLaptop->location,
        'side' => $meetingRoomLaptop->side,
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => '302A',
        'updated_in_q1' => $meetingRoomLaptop->updated_in_q1,
    ];

    $this->patch(route('equipment.updateMeetingRoomLaptop', $meetingRoomLaptop), $updatedData);
    $this->assertDatabaseHas('meeting_room_laptops', $updatedData);
});

it('can delete a meeting room laptop - BDD 15', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $this->delete(route('equipment.destroyMeetingRoomLaptop', $meetingRoomLaptop));
    $this->assertDatabaseMissing('meeting_room_laptops', ['id' => $meetingRoomLaptop->id]);
});
