<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DesktopFactory extends Factory
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
            'double_pc' => $this->faker->boolean(),
            'needs_dock' => $this->faker->boolean(),
            'status' => $this->faker->randomElement(['flex', 'static']),
            'floor' => $this->faker->numberBetween(1, 5),
            'island_number' => $this->faker->numberBetween(1, 10),
            'workspace_type' => $this->faker->randomElement(['developer', 'non-developer']),
            'updated_in_q1' => $this->faker->boolean(),
            'employee_id' => null,
        ];
    }
}