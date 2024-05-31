<?php

namespace App\Http\Controllers;

use App\Enum\ToastType;
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
    public function index()
    {
        $globalSearchColumns = ['first_name', 'last_name'];

        $employees = QueryBuilder::for(Employee::query())
            ->allowedSorts('id', 'first_name', 'last_name', 'updated_at', 'created_at')
            ->allowedFilters(
                'id',
                'first_name',
                'last_name',
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

        $teams = Team::all();
        $teamMembers = TeamMember::all();
        $desktops = Desktop::all();
        $laptops = Laptop::all();

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
                ->addColumn(new Column('created_at', 'Create At', sortable: true))
                ->addColumn(new Column('updated_at', 'Update At', sortable: true))
                ->addSearchInput(new SearchInput('first_name', 'First Name', shown: true))
                ->addSearchInput(new SearchInput('last_name', 'Last Name', shown: true))
                ->addSearchInput(new SearchInput('updated_at', 'Updated At', shown: true))
                ->addSearchInput(new SearchInput('created_at', 'Created At', shown: true))
                ->addSearchInput(new SearchInput('global_search', 'Global Search', shown: false));
        });
    }

    public function store(Request $request)
    {
        $employee = Employee::create($request->validate([
            'first_name' => ['required', 'max:40'],
            'last_name' => ['required', 'max:40'],
            'equipment_identifiers' => ['array'],
        ]));

        $this->toast('The employee was created successfully', ToastType::Success);

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

        $this->toast('The user was updated successfully', ToastType::Success);

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
        $teamMembersToDelete = TeamMember::where('employee_id', $employee->id)
            ->whereNotIn('team_id', $teamMembersIDs)->get();

        foreach ($teamMembersToDelete as $teamMember) {
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
        $teamMembers = TeamMember::where('employee_id', $employee->id)->get();

        foreach ($teamMembers as $teamMember) {
            $teamMember->delete();
        }

        $employee->delete();

        $this->toast('The user was deleted successfully', ToastType::Success);
    }
}
