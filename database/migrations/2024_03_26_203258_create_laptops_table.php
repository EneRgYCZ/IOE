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
        Schema::create('laptops', function (Blueprint $table) {
            $table->id();
            $table->string('full_number_identifier');
            $table->string('laptop_number');
            $table->enum('status', ['flex', 'static'])->nullable();
            $table->string('location');
            $table->string('side');
            $table->integer('floor');
            $table->integer('island_number');
            $table->enum('workspace_type', ['Developer', 'Non-developer'])->nullable();
            $table->boolean('q1')->nullable();
            $table->string('remarks')->nullable();
            $table->foreignId('employee_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laptops');
    }
};
