<?php

namespace Tests\Unit\Equipment;

use App\Models\MeetingRoomLaptop;

const MEETING_ROOM_LAPTOP_DATA = [
    'full_number_identifier' => 'MR123',
    'laptop_number' => 'MR001',
    'location' => 'Unit 1',
    'side' => 'North',
    'floor' => 1,
    'room_number' => '100A',
    'q1' => true,
];
const MEETING_ROOM_LAPTOP_DATA2 = [
    'full_number_identifier' => 'MR223',
    'laptop_number' => 'MR002',
    'location' => 'Unit 1',
    'side' => 'North',
    'floor' => 2,
    'room_number' => '200A',
    'q1' => false,
];
const MEETING_ROOM_LAPTOP_DATA3 = [
    'full_number_identifier' => 'MR323',
    'laptop_number' => 'MR003',
    'location' => 'Unit 2',
    'side' => 'South',
    'floor' => 3,
    'room_number' => '300A',
    'q1' => false,
];

it('can create a meeting room laptop - BDD 13', function () {
    $meetingRoomLaptopData = MEETING_ROOM_LAPTOP_DATA;

    $this->post(route('equipment.storeMeetingRoomLaptop'), $meetingRoomLaptopData);
    $this->assertDatabaseHas('meeting_room_laptops', $meetingRoomLaptopData);
});
it('can search a meeting room laptop - BDD 21', function () {
    $meetingRoomLaptopData = MEETING_ROOM_LAPTOP_DATA;

    $this->post(route('equipment.storeMeetingRoomLaptop'), $meetingRoomLaptopData);
    $this->assertDatabaseHas('meeting_room_laptops', $meetingRoomLaptopData);
    $response = $this->get('/equipment/meeting-room-laptops?search=MR123');
    $response->assertStatus(200);
    $response->assertSee('MR123');
});

it('can sort MR laptops by ID in ascending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=full_number_identifier');
    $response->assertSeeInOrder(['MR123', 'MR223', 'MR323']);
});

it('can sort MR laptops by ID in descending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=-full_number_identifier');
    $response->assertSeeInOrder(['MR323', 'MR223', 'MR123']);
});

it('can sort MR laptops by Laptop Number in ascending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=laptop_number');
    $response->assertSeeInOrder(['MR001', 'MR002', 'MR003']);
});

it('can sort MR laptops by Laptop Number in descending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=-laptop_number');
    $response->assertSeeInOrder(['MR003', 'MR002', 'MR001']);
});

it('can sort MR laptops by location in ascending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=location');
    $response->assertSeeInOrder(['Unit 1', 'Unit 1', 'Unit 2']);
});

it('can sort MR laptops by Location in descending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=-location');
    $response->assertSeeInOrder(['Unit 2', 'Unit 1', 'Unit 1']);
});

it('can sort MR laptops by side in ascending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=side');
    $response->assertSeeInOrder(['North', 'North', 'South']);
});

it('can sort MR laptops by side in descending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=-side');
    $response->assertSeeInOrder(['South', 'North', 'North']);
});

it('can sort MR laptops by floor in ascending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=floor');
    $response->assertSeeInOrder(['1', '2', '3']);
});

it('can sort MR laptops by floor in descending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=-floor');
    $response->assertSeeInOrder(['3', '2', '1']);
});

it('can sort MR laptops by q1 in ascending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=q1');
    $response->assertSeeInOrder(['false', 'false', 'true']);
});

it('can sort MR laptops by q1 in descending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=-q1');
    $response->assertSeeInOrder(['true', 'false', 'false']);
});

it('can sort MR laptops by room number in ascending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=room_number');
    $response->assertSeeInOrder(['100A', '200A', '300A']);
});

it('can sort MR laptops by room number in descending order - BDD 22', function () {
    $mr1 = MEETING_ROOM_LAPTOP_DATA;
    $mr2 = MEETING_ROOM_LAPTOP_DATA2;
    $mr3 = MEETING_ROOM_LAPTOP_DATA3;

    MeetingRoomLaptop::create($mr1);
    MeetingRoomLaptop::create($mr2);
    MeetingRoomLaptop::create($mr3);

    $response = $this->get('/equipment/meeting-room-laptops?sort=-room_number');
    $response->assertSeeInOrder(['300A', '200A', '100A']);
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
        'full_number_identifier' => $meetingRoomLaptop->full_number_identifier,
        'laptop_number' => $meetingRoomLaptop->laptop_number,
        'location' => $meetingRoomLaptop->location,
        'side' => $meetingRoomLaptop->side,
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => $meetingRoomLaptop->room_number,
        'q1' => $meetingRoomLaptop->q1,
    ];

    $this->patch(route('equipment.updateMeetingRoomLaptop', $meetingRoomLaptop), $updatedData);
    $this->assertDatabaseHas('meeting_room_laptops', $updatedData);
});

it('can update the laptop number of a meeting room laptop - BDD 14', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $meetingRoomLaptop->full_number_identifier,
        'laptop_number' => $meetingRoomLaptop->laptop_number,
        'location' => $meetingRoomLaptop->location,
        'side' => $meetingRoomLaptop->side,
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => $meetingRoomLaptop->room_number,
        'q1' => $meetingRoomLaptop->q1,
    ];

    $this->patch(route('equipment.updateMeetingRoomLaptop', $meetingRoomLaptop), $updatedData);
    $this->assertDatabaseHas('meeting_room_laptops', $updatedData);
});

it('can update the location of a meeting room laptop - BDD 14', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $updatedData = [
        'full_number_identifier' => $meetingRoomLaptop->full_number_identifier,
        'laptop_number' => $meetingRoomLaptop->laptop_number,
        'location' => $meetingRoomLaptop->location,
        'side' => $meetingRoomLaptop->side,
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => $meetingRoomLaptop->room_number,
        'q1' => $meetingRoomLaptop->q1,
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
        'side' => $meetingRoomLaptop->side,
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => $meetingRoomLaptop->room_number,
        'q1' => $meetingRoomLaptop->q1,
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
        'floor' => $meetingRoomLaptop->floor,
        'room_number' => $meetingRoomLaptop->room_number,
        'q1' => $meetingRoomLaptop->q1,
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
        'room_number' => $meetingRoomLaptop->room_number,
        'q1' => $meetingRoomLaptop->q1,
    ];

    $this->patch(route('equipment.updateMeetingRoomLaptop', $meetingRoomLaptop), $updatedData);
    $this->assertDatabaseHas('meeting_room_laptops', $updatedData);
});

it('can delete a meeting room laptop - BDD 15', function () {
    $meetingRoomLaptop = MeetingRoomLaptop::factory()->create();
    $this->delete(route('equipment.destroyMeetingRoomLaptop', $meetingRoomLaptop));
    $this->assertDatabaseMissing('meeting_room_laptops', ['id' => $meetingRoomLaptop->id]);
});
