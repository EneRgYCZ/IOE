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
    /**
     * Display a listing of the resource.
     */
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
                ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
                ->withQueryString();

        $employees = Employee::query()->get();

        $teamMembers = TeamMember::query()->get();

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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $team = Team::create($request->validate([
            'team_name' => ['required', 'max:50'],
            'description' => ['required', 'max:50'],
        ]));

        $this->toast('The team was created successfully', ToastType::Success);

        $teamMembers = $request->input('team_members');
        foreach ($teamMembers as $teamMember) {
            TeamMember::create([
                'team_id' => $team->id,
                'employee_id' => $teamMember['id'],
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        $team->update($request->validate([
            'team_name' => ['required', 'max:20'],
            'description' => ['required', 'max:50'],
        ]));

        $this->toast('The team was updated successfully', ToastType::Success);

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

        $teamMembersIDs = array_column($teamMembers, 'id');
        $teamMembersToDelete = TeamMember::where('team_id', $team->id)
            ->whereNotIn('employee_id', $teamMembersIDs)->get();

        foreach ($teamMembersToDelete as $teamMember) {
            $teamMember->delete();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        $teamMembers = TeamMember::where('team_id', $team->id)->get();

        foreach ($teamMembers as $teamMember) {
            $teamMember->delete();
        }

        $team->delete();

        $this->toast('The team was deleted successfully', ToastType::Success);
    }
}
