<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Laptop extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $fillable = [
        'full_number_identifier',
        'laptop_number',
        'location',
        'side',
        'serial_number',
        'status',
        'floor',
        'island_number',
        'workspace_type',
        'q1',
        'employee_id',
        'remarks',
    ];

    protected $cast = [
        'q1' => 'boolean',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return
            LogOptions::defaults()
                ->logFillable()
                ->dontSubmitEmptyLogs();
    }
}
