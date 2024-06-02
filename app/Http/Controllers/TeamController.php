<?php

namespace App\Http\Controllers;

use App\Enum\ToastType;
use App\Models\Employee;
use App\Models\Team;
use App\Models\TeamMember;
use App\Table\Column;
use App\Table\SearchInput;
use App\Table\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class TeamController extends Controller
{
    const STRING_LENGTH = 'max:50';

    // Function to load the main page for the teams.
    // Includes getting necessary information for the page and rendering it via Inertia
    // It is also in charge of setting up the teams table of the page
    public function index()
    {
        $globalSearchColumns = [
            'id',
            'team_name',
            'description',
        ];

        $teams =
            QueryBuilder::for(Team::query())
                ->allowedSorts('id', 'team_name', 'description', 'updated_at', 'created_at')
                ->allowedFilters(
                    'id',
                    'team_name',
                    'description',
                    'updated_at',
                    'created_at',
                    AllowedFilter::callback(
                        'global_search',
                        function (Builder $query, $value) use ($globalSearchColumns) {
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
                ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
                ->withQueryString();

        $employees = Employee::query()->get(); // To show a list of employees that could be added to the team
        $teamMembers = TeamMember::query()->get(); // To show which employees are in which teams

        return Inertia::render('Teams/index', [
            'teams' => $teams,
            'employees' => $employees,
            'team_members' => $teamMembers,
        ])->table(function (Table $table) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('team_name', 'Team Name', sortable: true))
                ->addColumn(new Column('description', 'Description', sortable: true))
                ->addColumn(new Column('created_at', 'Create At', sortable: true))
                ->addColumn(new Column('updated_at', 'Update At', sortable: true))
                ->addSearchInput(new SearchInput('team_name', 'Team Name', shown: true))
                ->addSearchInput(new SearchInput('description', 'Description', shown: true))
                ->addSearchInput(new SearchInput('updated_at', 'Updated At', shown: true))
                ->addSearchInput(new SearchInput('created_at', 'Created At', shown: true))
                ->addSearchInput(new SearchInput('global_search', 'Global Search', shown: false));
        });
    }

    // Function to create a team and add it to the database
    public function store(Request $request)
    {
        // Creates a team if backend validation is passed
        $team = Team::create($request->validate([
            'team_name' => ['required', self::STRING_LENGTH],
            'description' => ['required', self::STRING_LENGTH],
        ]));

        $this->toast('The team was created successfully', ToastType::Success);

        // The team-employee relations are individually stored as team member relations if employees are added to a team
        $teamMembers = $request->input('team_members');
        foreach ($teamMembers as $teamMember) {
            TeamMember::create([
                'team_id' => $team->id,
                'employee_id' => $teamMember['id'],
            ]);
        }
    }

    // Function to edit a team and update it in the database
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
        // Updates a team if backend validation is passed
        $team->update($request->validate([
            'team_name' => ['required', self::STRING_LENGTH],
            'description' => ['required', self::STRING_LENGTH],
        ]));

        $this->toast('The team was updated successfully', ToastType::Success);

        // The team-employee relations are added if they didn't exist already
        $teamMembers = $request->input('team_members');
        foreach ($teamMembers as $teamMember) {
            $alreadyExists = TeamMember::where('team_id', $team->id)
                ->where('employee_id', $teamMember['id'])
                ->first();

            if (! $alreadyExists) {
                TeamMember::create([
                    'team_id' => $team->id,
                    'employee_id' => $teamMember['id'],
                ]);
            }
        }

        // The team-employee relations are removed if the passed list of employees
        // does not tie a specific employee to a team anymore
        $teamMembersIDs = array_column($teamMembers, 'id');
        $teamMembersToDelete = TeamMember::where('team_id', $team->id)
            ->whereNotIn('employee_id', $teamMembersIDs)->get();

        foreach ($teamMembersToDelete as $teamMember) {
            $teamMember->delete();
        }
    }

    // Function used upon deleting a team in order to remove the entity from the database
    public function destroy(Team $team)
    {
        // First all team-employee relations involving this team are removed
        $teamMembers = TeamMember::where('team_id', $team->id)->get();

        foreach ($teamMembers as $teamMember) {
            $teamMember->delete();
        }

        // Then the team is deleted
        $team->delete();

        $this->toast('The team was deleted successfully', ToastType::Success);
    }
}
