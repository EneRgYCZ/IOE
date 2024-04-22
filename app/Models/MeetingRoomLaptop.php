<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingRoomLaptop extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'serial_number',
        'floor',
        'room_number',
        'updated_in_q1',
    ];
}
