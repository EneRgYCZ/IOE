<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Team::factory(20)->create();
        \App\Models\Laptop::factory(20)->create();
        \App\Models\Desktop::factory(20)->create();
        \App\Models\Employee::factory(20)->create();
        \App\Models\MeetingRoomLaptop::factory(20)->create();
    }
}
