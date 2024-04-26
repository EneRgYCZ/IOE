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
        'serial_number',
        'double_pc',
        'needs_dock',
        'status',
        'floor',
        'island_number',
        'workspace_type',
        'updated_in_q1',
        'employee_id',
    ];

    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return
            LogOptions::defaults()
                ->logAll()
                ->logOnlyDirty()
                ->dontSubmitEmptyLogs();
    }
}
