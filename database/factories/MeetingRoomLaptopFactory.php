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
            'full_number_identifier' => $this->faker->randomNumber(8),
            'laptop_number' => $this->faker->randomNumber(4),
            'location' => $this->faker->randomElement(['GHH', 'Waagstraat']),
            'side' => $this->faker->randomElement(['North', 'South']),
            'floor' => $this->faker->numberBetween(1, 5),
            'room_number' => $this->faker->numberBetween(1, 50),
            'q1' => $this->faker->boolean(),
            'remarks' => null,
        ];
    }
}
