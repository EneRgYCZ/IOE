<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Employee extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $fillable = [
        'first_name',
        'last_name',
    ];

    public function teamMember(): HasMany
    {
        return $this->hasMany(TeamMember::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return
            LogOptions::defaults()
                ->logAll()
                ->dontSubmitEmptyLogs();
    }
}
