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
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class EmployeeController extends Controller
{
    // Function to load the main page for the employees.
    // Includes getting necessary information for the page and rendering it via Inertia
    // It is also in charge of setting up the employees table of the page
    public function index()
    {
        $globalSearchColumns = ['first_name', 'last_name'];

        $employees = QueryBuilder::for(Employee::query())
            ->allowedSorts('id', 'first_name', 'last_name')
            ->allowedFilters(
                'id',
                'first_name',
                'last_name',
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

        $teams = Team::all(); // To show a list of teams that could be added to the employee
        $teamMembers = TeamMember::all(); // To show which teams each employee belongs to
        $desktops = Desktop::all(); // To show a list of desktops that could be added to the employee
        $laptops = Laptop::all(); // To show a list of laptops that could be added to the employee

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
                ->addSearchInput(new SearchInput('last_name', 'Last Name', shown: true))
                ->addSearchInput(new SearchInput('global_search', 'Global Search', shown: false));
        });
    }

    // Function used upon creating an employee in order to store the entity in the database
    public function store(Request $request)
    {
        // Employee creation if backend validation of input is passed
        $employee = Employee::create($request->validate([
            'first_name' => ['required', 'max:40'],
            'last_name' => ['required', 'max:40'],
            'equipment_identifiers' => ['array'],
        ]));

        // If a team is added to an employee, the team-employee relation is stored separately as team member relations
        $teamMembers = $request->input('team_members');
        foreach ($teamMembers as $teamMember) {
            TeamMember::create([
                'team_id' => $teamMember['id'],
                'employee_id' => $employee->id,
            ]);
        }

        // If an equipment is added to an employee, the equipment is also updated with the ID of the newly created employee
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

    // Function used upon updating an employee in order to modify the entity in the database
    public function update(Request $request, Employee $employee)
    {
        // Employee update if backend validation of input is passed
        $employee->update($request->validate([
            'first_name' => ['required', 'max:40'],
            'last_name' => ['required', 'max:40'],
            'equipment_identifiers' => ['array'],
        ]));

        // Using the new team members list, if the employee-team relation did not exist before, it is created.
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

        // If a team is removed from an employee, it is also removed as a team member relation.
        $teamMembersIDs = array_column($teamMembers, 'id');
        $teamMembersToDelete = TeamMember::where('employee_id', $employee->id)
            ->whereNotIn('team_id', $teamMembersIDs)->get();

        foreach ($teamMembersToDelete as $teamMember) {
            $teamMember->delete();
        }

        // If an equipment is added to an employee, the equipment is also updated with the ID of the newly created employee.
        $equipment_identifiers = $request->input('equipment_identifiers', []);

        $desktop = Desktop::whereIn('full_number_identifier', $equipment_identifiers)->first();

        if ($desktop) {
            $desktop->update(['employee_id' => $employee->id]);
        }

        $laptop = Laptop::whereIn('full_number_identifier', $equipment_identifiers)->first();

        if ($laptop) {
            $laptop->update(['employee_id' => $employee->id]);
        }

        // If an equipment is removed from an employee, the equipment is also updated with null instead of the employee ID.
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

    // Function used upon deleting an employee in order to remove the entity from the database
    public function destroy(Employee $employee)
    {
        // First all team-employee relations involving this employee are removed
        $teamMembers = TeamMember::where('employee_id', $employee->id)->get();

        foreach ($teamMembers as $teamMember) {
            $teamMember->delete();
        }

        // Then the employee is deleted
        $employee->delete();
    }
}
