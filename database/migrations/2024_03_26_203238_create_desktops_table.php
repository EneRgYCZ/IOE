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
        Schema::create('desktops', function (Blueprint $table) {
            $table->id();
            $table->string('full_number_identifier');
            $table->string('pc_number');
            $table->boolean('double_pc')->nullable();
            $table->boolean('needs_dock')->nullable();
            $table->enum('status', ['flex', 'static'])->nullable();
            $table->enum('location', ['ghh', 'waagstraat']);
            $table->enum('side', ['north', 'south']);
            $table->integer('floor');
            $table->integer('island_number');
            $table->enum('workspace_type', ['developer', 'non-developer'])->nullable();
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
        Schema::dropIfExists('desktops');
    }
};
