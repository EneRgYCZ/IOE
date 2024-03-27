<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\Employee::factory(20)->create();
        \App\Models\Desktop::factory(50)->create();
        \App\Models\Team::factory(10)->create();
        \App\Models\MeetingRoomLaptop::factory(10)->create();
        \App\Models\Laptop::factory(50)->create();
        \App\Models\Logs::factory(100)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
