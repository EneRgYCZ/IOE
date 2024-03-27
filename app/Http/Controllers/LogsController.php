<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Table\Column;
use App\Table\SearchInput;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logs = QueryBuilder::for(Logs::class)
            ->allowedSorts('id', 'model', 'action', 'description')
            ->allowedFilters('id', 'model', 'action', 'description')
            ->paginate(request('perPage') ?? 10)
            ->withQueryString();

        return Inertia::render('Logs/index', [
            'logs' => $logs,
        ])->table(function ($table) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('model', 'Model', sortable: true))
                ->addColumn(new Column('action', 'Action', sortable: true))
                ->addColumn(new Column('description', 'Description', sortable: true))
                ->addSearchInput(new SearchInput('model', 'Model', shown: true))
                ->addSearchInput(new SearchInput('action', 'Action', shown: true))
                ->addSearchInput(new SearchInput('description', 'Description', shown: true));
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Logs $logs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Logs $logs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Logs $logs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Logs $logs)
    {
        //
    }
}
