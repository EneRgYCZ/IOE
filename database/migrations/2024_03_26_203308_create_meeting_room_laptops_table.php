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
            $table->integer('serial_number');
            $table->integer('floor');
            $table->string('room_number');
            $table->boolean('updated_in_q1');
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
