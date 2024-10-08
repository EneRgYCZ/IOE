<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class MeetingRoomLaptop extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $fillable = [
        'full_number_identifier',
        'laptop_number',
        'location',
        'side',
        'serial_number',
        'floor',
        'room_number',
        'q1',
        'remarks',
    ];

    protected $cast = [
        'q1' => 'boolean',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return
            LogOptions::defaults()
                ->logFillable()
                ->dontSubmitEmptyLogs();
    }
}
