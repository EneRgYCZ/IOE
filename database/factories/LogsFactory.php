<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Logs>
 */
class LogsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'model' => $this->faker->randomElement(['Employee', 'Desktop', 'Team', 'MeetingRoomLaptop', 'Laptop']),
            'action' => $this->faker->randomElement(['create', 'update', 'delete']),
            'description' => $this->faker->sentence(),
        ];
    }
}
