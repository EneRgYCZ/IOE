<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Table\Column;
use App\Table\SearchInput;
use App\Table\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams =
            QueryBuilder::for(Team::query())
                ->allowedSorts('id', 'team_name', 'description')
                ->allowedFilters(
                    'id',
                    'team_name',
                    'description',
                )
                ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
                ->withQueryString();

        return Inertia::render('Teams/index', [
            'teams' => $teams,
        ])->table(function (Table $table) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('team_name', 'Team Name', sortable: true))
                ->addColumn(new Column('description', 'Description', sortable: true))
                ->addSearchInput(new SearchInput('team_name', 'Team Name', shown: true))
                ->addSearchInput(new SearchInput('description', 'Description', shown: true));
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Team::create($request->validate([
            'team_name' => ['required', 'max:20'],
            'description' => ['max:50'],
        ]));

        return redirect(route('teams.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        $team->update($request->validate([
            'team_name' => ['required', 'max:20'],
            'description' => ['max:50'],
        ]));

        return redirect(route('teams.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        $team->delete();

        return redirect(route('teams.index'));
    }
}
