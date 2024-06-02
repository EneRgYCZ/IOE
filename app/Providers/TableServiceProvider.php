<?php

namespace App\Providers;

use App\Table\Table;
use Illuminate\Support\ServiceProvider;
use Inertia\Response;

class TableServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Response::macro('getQueryBuilder', fn () => $this->props['queryBuilder'] ?? []);

        Response::macro('table', function (callable $tableBuilder) {
            $table = new Table(request());
            $tableBuilder($table);

            return $table->apply($this);
        });
    }
}
