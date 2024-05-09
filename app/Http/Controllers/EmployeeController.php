<?php

namespace App\Http\Controllers;

use App\Models\Desktop;
use App\Models\Employee;
use App\Models\Laptop;
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

        $desktops = Desktop::query()->get();
        $laptops = Laptop::query()->get();

        return Inertia::render('Employees/index', [
            'employees' => $employees,
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
            'first_name' => ['required', 'max:20'],
            'last_name' => ['required', 'max:20'],
            'equipment_identifiers' => ['array'],
        ]));

        $equipment_identifiers = $request->input('equipment_identifiers', []);

        Desktop::whereIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => $employee->id]);
        Laptop::whereIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => $employee->id]);

        return redirect(route('employees.index'));
    }

    public function update(Request $request, Employee $employee)
    {
        $employee->update($request->validate([
            'first_name' => ['required', 'max:20'],
            'last_name' => ['required', 'max:20'],
            'equipment_identifiers' => ['array'],
        ]));

        $equipment_identifiers = $request->input('equipment_identifiers', []);

        Desktop::whereIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => $employee->id]);
        Laptop::whereIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => $employee->id]);

        Desktop::where('employee_id', $employee->id)
            ->whereNotIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => null]);

        Laptop::where('employee_id', $employee->id)
            ->whereNotIn('full_number_identifier', $equipment_identifiers)
            ->update(['employee_id' => null]);

        return redirect(route('employees.index'));
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect(route('employees.index'));
    }
}
