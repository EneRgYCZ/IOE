<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meeting_room_laptops', function (Blueprint $table) {
            $table->id();
            $table->string('full_number_identifier');
            $table->string('laptop_number');
            $table->enum('location', ['ghh', 'waagstraat']);
            $table->enum('side', ['north', 'south']);
            $table->integer('floor');
            $table->string('room_number')->nullable();
            $table->boolean('q1')->nullable();
            $table->string('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meeting_room_laptops');
    }
};
