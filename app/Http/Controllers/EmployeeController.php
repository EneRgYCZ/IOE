<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Team;
use App\Models\TeamMember;
use App\Table\Column;
use App\Table\SearchInput;
use App\Table\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees =
            QueryBuilder::for(Employee::query())
                ->allowedSorts('id', 'first_name', 'last_name')
                ->allowedFilters(
                    'id',
                    'first_name',
                    'last_name',
                )
                ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
                ->withQueryString();

        $teams = Team::query()->get();

        $teamMembers = TeamMember::query()->get();

        return Inertia::render('Employees/index', [
            'employees' => $employees,
            'teams' => $teams,
            'team_members' => $teamMembers,
        ])->table(function (Table $table) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('first_name', 'First Name', sortable: true))
                ->addColumn(new Column('last_name', 'Last Name', sortable: true))
                ->addSearchInput(new SearchInput('first_name', 'First Name', shown: true))
                ->addSearchInput(new SearchInput('last_name', 'Last Name', shown: true));
        });
    }

    public function store(Request $request)
    {
        $employee = Employee::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
        ]);

        $teamMembers = $request->input('team_members');
        foreach ($teamMembers as $teamMember) {
            TeamMember::create([
                'team_id' => $teamMember['id'],
                'employee_id' => $employee->id,
            ]);
        }

        return redirect(route('employees.index'));

    }

    public function update(Request $request, Employee $employee)
    {
        $employee->update([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
        ]);

        $teamMembers = $request->input('team_members');
        foreach ($teamMembers as $teamMember) {
            $alreadyExists = TeamMember::where('team_id', $teamMember['id'])
                ->where('employee_id', $employee->id)
                ->first();

            if (! $alreadyExists) {
                TeamMember::create([
                    'team_id' => $teamMember['id'],
                    'employee_id' => $employee->id,
                ]);
            }
        }

        $teamMembersIDs = array_column($teamMembers, 'id');
        TeamMember::where('employee_id', $employee->id)
            ->whereNotIn('team_id', $teamMembersIDs)
            ->delete();

        return redirect(route('employees.index'));
    }

    public function destroy(Employee $employee)
    {
        TeamMember::where('employee_id', $employee->id)
            ->delete();

        $employee->delete();

        return redirect(route('employees.index'));
    }
}
