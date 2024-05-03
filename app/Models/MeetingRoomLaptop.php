<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class MeetingRoomLaptop extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_number_identifier',
        'laptop_number',
        'location',
        'side',
        'serial_number',
        'floor',
        'room_number',
        'updated_in_q1',
        'remarks',
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
