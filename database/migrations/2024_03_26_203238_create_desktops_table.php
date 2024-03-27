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
            $table->integer('serial_number');
            $table->boolean('double_pc');
            $table->boolean('needs_dock');
            $table->enum('status', ['flex', 'static']);
            $table->integer('floor');
            $table->integer('island_number');
            $table->enum('workspace_type', ['developer', 'non-developer']);
            $table->boolean('updated_in_q1');
            $table->foreignId('employee_id')->nullable()->constrained();
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
