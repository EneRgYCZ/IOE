<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Desktop extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_number_identifier',
        'pc_number',
        'location',
        'side',
        'serial_number',
        'double_pc',
        'needs_dock',
        'status',
        'floor',
        'island_number',
        'workspace_type',
        'q1',
        'employee_id',
        'remarks',
    ];

    protected $cast = [
        'double_pc' => 'boolean',
        'q1' => 'boolean',
        'needs_dock' => 'boolean',
    ];

    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return
            LogOptions::defaults()
                ->logFillable()
                ->dontSubmitEmptyLogs();
    }
}
