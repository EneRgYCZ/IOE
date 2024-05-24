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
    // Function to load the main page for the employees.
    // Includes getting necessary information for the page and rendering it via Inertia
    // It is also in charge of setting up the employees table of the page
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

        $teams = Team::query()->get(); // To show a list of teams that could be added to the employee
        $teamMembers = TeamMember::query()->get(); // To show which teams each employee belongs to
        $desktops = Desktop::query()->get(); // To show a list of desktops that could be added to the employee
        $laptops = Laptop::query()->get(); // To show a list of laptops that could be added to the employee

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
        Desktop::whereIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => $employee->id]);
        Laptop::whereIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => $employee->id]);

        return redirect(route('employees.index'));
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
        TeamMember::where('employee_id', $employee->id)
            ->whereNotIn('team_id', $teamMembersIDs)
            ->delete();

        // If an equipment is added to an employee, the equipment is also updated with the ID of the newly created employee.
        $equipment_identifiers = $request->input('equipment_identifiers', []);
        Desktop::whereIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => $employee->id]);
        Laptop::whereIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => $employee->id]);

        // If an equipment is removed from an employee, the equipment is also updated with null instead of the employee ID.
        Desktop::where('employee_id', $employee->id)
            ->whereNotIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => null]);
        Laptop::where('employee_id', $employee->id)
            ->whereNotIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => null]);

        return redirect(route('employees.index'));
    }

    // Function used upon deleting an employee in order to remove the entity from the database
    public function destroy(Employee $employee)
    {
        // First all team-employee relations involving this employee are removed
        TeamMember::where('employee_id', $employee->id)
            ->delete();

        // Then the employee is deleted
        $employee->delete();

        return redirect(route('employees.index'));
    }
}
