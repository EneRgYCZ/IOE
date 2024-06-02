<?php

namespace App\Http\Controllers;

use App\Table\Column;
use App\Table\SearchInput;
use App\Table\Table;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity as Logs;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class LogsController extends Controller
{
    // Function to load the main page for the logs.
    // Includes getting necessary information for the page and rendering it via Inertia
    // It is also in charge of setting up the logs table of the page
    public function index()
    {
        $globalSearchColumns = [
            'event',
            'subject_type',
            'updated_at',
            'properties',
        ];

        $logs = QueryBuilder::for(Logs::query()->with('subject'))
            ->allowedSorts('id', 'event', 'subject_type', 'updated_at')
            ->allowedFilters(
                'event',
                'subject_type',
                'updated_at',
                AllowedFilter::callback('global_search', function (Builder $query, $value) use ($globalSearchColumns) {
                    $query->where(function ($subQuery) use ($globalSearchColumns, $value) {
                        foreach ($globalSearchColumns as $column) {
                            if (is_array($value)) {
                                $value = implode('', $value);
                            }
                            $subQuery->orWhere($column, 'like', "%{$value}%");
                        }
                    });
                })
            )
            ->orderByDesc('updated_at')
            ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
            ->withQueryString();

        return Inertia::render('Logs/index', [
            'logs' => $logs,
        ])->table(function ($table) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('subject_type', 'Entity', sortable: true))
                ->addColumn(new Column('event', 'Event', sortable: true))
                ->addColumn(new Column('updated_at', 'Date', sortable: true))
                ->addColumn(new Column('properties', 'Changes', hidden: false))
                ->addSearchInput(new SearchInput('subject_type', 'Entity', shown: true))
                ->addSearchInput(new SearchInput('event', 'Event', shown: true))
                ->addSearchInput(new SearchInput('global_search', 'Global Search', shown: false));
        });
    }
}
