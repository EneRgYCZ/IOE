<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Team extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $fillable = ['team_name', 'description', 'team_member'];

    public function teamMember(): HasMany
    {
        return $this->HasMany(TeamMember::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return
            LogOptions::defaults()
                ->logFillable()
                ->dontSubmitEmptyLogs();
    }
}
