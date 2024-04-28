<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Table\Column;
use App\Table\SearchInput;
use Illuminate\Http\Request;
use App\Table\Table;
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

        return Inertia::render('Employees/index', [
            'employees' => $employees,
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
