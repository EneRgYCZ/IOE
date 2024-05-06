<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Desktop;
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

        $desktops = QueryBuilder::for(Desktop::query())
            ->paginate();

        $laptops = QueryBuilder::for(Laptop::query())
            ->paginate();

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
        Employee::create($request->all());

        return redirect(route('employees.index'));

    }

    public function update(Request $request, Employee $employee)
    {
        $employee->update($request->all());

        return redirect(route('employees.index'));
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect(route('employees.index'));
    }
}
