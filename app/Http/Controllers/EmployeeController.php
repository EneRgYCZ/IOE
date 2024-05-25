<?php

namespace App\Http\Controllers;

use App\Models\Desktop;
use App\Models\Employee;
use App\Models\Laptop;
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
        $desktops = Desktop::query()->get();
        $laptops = Laptop::query()->get();

        return Inertia::render('Employees/index', [
            'employees' => $employees,
            'teams' => $teams,
            'team_members' => $teamMembers,
            'desktops' => $desktops,
            'laptops' => $laptops,
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
        $employee = Employee::create($request->validate([
            'first_name' => ['required', 'max:40'],
            'last_name' => ['required', 'max:40'],
            'equipment_identifiers' => ['array'],
        ]));

        $teamMembers = $request->input('team_members');
        foreach ($teamMembers as $teamMember) {
            TeamMember::create([
                'team_id' => $teamMember['id'],
                'employee_id' => $employee->id,
            ]);
        }

        $equipment_identifiers = $request->input('equipment_identifiers', []);
        $desktop = Desktop::whereIn('full_number_identifier', $equipment_identifiers)->first();

        if ($desktop) {
            $desktop->update(['employee_id' => $employee->id]);
        }

        $laptop = Laptop::whereIn('full_number_identifier', $equipment_identifiers)->first();

        if ($laptop) {
            $laptop->update(['employee_id' => $employee->id]);
        }
    }

    public function update(Request $request, Employee $employee)
    {
        $employee->update($request->validate([
            'first_name' => ['required', 'max:40'],
            'last_name' => ['required', 'max:40'],
            'equipment_identifiers' => ['array'],
        ]));

        $teamMembers = $request->input('team_members');
        foreach ($teamMembers as $teamMember) {
            $alreadyExists = TeamMember::where('employee_id', $employee->id)
                ->where('team_id', $teamMember['id'])
                ->first();

            if (! $alreadyExists) {
                TeamMember::create([
                    'team_id' => $teamMember['id'],
                    'employee_id' => $employee->id,
                ]);
            }
        }

        $teamMembersIDs = array_column($teamMembers, 'id');
        $teamMember = TeamMember::where('employee_id', $employee->id)
            ->whereNotIn('team_id', $teamMembersIDs)->first();

        if ($teamMember) {
            $teamMember->delete();
        }

        $equipment_identifiers = $request->input('equipment_identifiers', []);

        $desktop = Desktop::whereIn('full_number_identifier', $equipment_identifiers)->first();

        if ($desktop) {
            $desktop->update(['employee_id' => $employee->id]);
        }

        $laptop = Laptop::whereIn('full_number_identifier', $equipment_identifiers)->first();

        if ($laptop) {
            $laptop->update(['employee_id' => $employee->id]);
        }

        $desktop = Desktop::where('employee_id', $employee->id)
            ->whereNotIn('full_number_identifier', $equipment_identifiers)->first();

        if ($desktop) {
            $desktop->update(['employee_id' => null]);
        }

        $laptop = Laptop::where('employee_id', $employee->id)
            ->whereNotIn('full_number_identifier', $equipment_identifiers)->first();

        if ($laptop) {
            $laptop->update(['employee_id' => null]);
        }
    }

    public function destroy(Employee $employee)
    {
        $teamMember = TeamMember::where('employee_id', $employee->id)->first();

        if ($teamMember) {
            $teamMember->delete();
        }

        $employee->delete();
    }
}
