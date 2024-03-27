<?php

namespace App\Http\Controllers;

use App\Models\Desktop;
use App\Table\Column;
use App\Table\SearchInput;
use App\Table\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $desktops = QueryBuilder::for(Desktop::query())
            ->allowedSorts('id', 'serial_number', 'double_pc', 'needs_dock', 'status', 'floor', 'island_number', 'type', 'updated_in_q1', 'employee_id')
            ->allowedFilters(
                'id',
                'serial_number',
                'double_pc',
                'needs_dock',
                'status',
                'floor',
                'island_number',
                'type',
                'updated_in_q1',
                'employee_id',
            )
            ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
            ->withQueryString();

        return Inertia::render('Teams/index', [
            'desktops' => $desktops,
        ])->table(function (Table $table) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('serial_number', 'Serial Number', sortable: true))
                ->addColumn(new Column('double_pc', 'Double PC', sortable: true))
                ->addColumn(new Column('needs_dock', 'Needs Dock', sortable: true))
                ->addColumn(new Column('status', 'Status', sortable: true))
                ->addColumn(new Column('floor', 'Floor', sortable: true))
                ->addColumn(new Column('island_number', 'Island Number', sortable: true))
                ->addColumn(new Column('type', 'Type', sortable: true))
                ->addColumn(new Column('updated_in_q1', 'Updated in Q1', sortable: true))
                ->addColumn(new Column('employee_id', 'Employee Id', sortable: true))
                ->addSearchInput(new SearchInput('serial_number', 'Serial Number', shown: true))
                ->addSearchInput(new SearchInput('double_pc', 'Double PC', shown: true))
                ->addSearchInput(new SearchInput('needs_dock', 'Needs Dock', shown: true))
                ->addSearchInput(new SearchInput('status', 'Status', shown: true))
                ->addSearchInput(new SearchInput('floor', 'Floor', shown: true))
                ->addSearchInput(new SearchInput('island_number', 'Island Number', shown: true))
                ->addSearchInput(new SearchInput('type', 'Type', shown: true))
                ->addSearchInput(new SearchInput('updated_in_q1', 'Updated in Q1', shown: true))
                ->addSearchInput(new SearchInput('employee_id', 'Employee Id', shown: true));
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
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
