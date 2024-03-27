<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeetingRoomLaptop>
 */
class MeetingRoomLaptopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'serial_number' => $this->faker->randomNumber(8),
            'floor' => $this->faker->numberBetween(1, 5),
            'room_number' => $this->faker->randomElement(['A', 'B', 'C', 'D', 'E']),
            'updated_in_q1' => $this->faker->boolean(),
        ];
    }
}
