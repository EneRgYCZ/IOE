<?php

namespace App\Http\Controllers;

use App\Table\Column;
use App\Table\SearchInput;
use App\Table\Table;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity as Logs;
use Spatie\QueryBuilder\QueryBuilder;

class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logs = QueryBuilder::for(Logs::query()->with('causer', 'subject'))
            ->allowedSorts('id', 'event', 'subject_type', 'updated_at')
            ->allowedFilters(
                'event',
                'subject_type',
                'updated_at'
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
                ->addSearchInput(new SearchInput('subject_type', 'Entity', shown: true))
                ->addSearchInput(new SearchInput('event', 'Event', shown: true));
        });
    }
}
