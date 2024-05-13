<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Table\Column;
use App\Table\GlobalSearchInput;
use App\Table\SearchInput;
use App\Table\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;

class EmployeeController extends Controller
{
    public function index()
    {
        $globalSearchColumns = ['id', 'first_name', 'last_name'];

        $employees = QueryBuilder::for(Employee::query())
            ->allowedSorts('id', 'first_name', 'last_name')
            ->allowedFilters(
                'id',
                'first_name',
                'last_name',
                AllowedFilter::callback('global_search', function (Builder $query, $value) use ($globalSearchColumns) {
                    $query->where(function ($subQuery) use ($globalSearchColumns, $value) {
                        foreach ($globalSearchColumns as $column) {
                            $subQuery->orWhere($column, 'like', "%{$value}%");
                        }
                    });
                })
            )
            ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
            ->withQueryString();

        return Inertia::render('Employees/index', [
            'employees' => $employees,
        ])->table(function (Table $table) use ($globalSearchColumns) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('first_name', 'First Name', sortable: true))
                ->addColumn(new Column('last_name', 'Last Name', sortable: true))
                ->addSearchInput(new SearchInput('first_name', 'First Name', shown: true))
                ->addSearchInput(new SearchInput('last_name', 'Last Name', shown: true))
                ->addSearchInput(new GlobalSearchInput($globalSearchColumns, 'Global Search'));
        });
    }


    public function store(Request $request)
    {
        Employee::create($request->validate([
            'first_name' => ['required', 'max:40'],
            'last_name' => ['required', 'max:40'],
        ]));

        return redirect(route('employees.index'));
    }

    public function update(Request $request, Employee $employee)
    {
        $employee->update($request->validate([
            'first_name' => ['required', 'max:40'],
            'last_name' => ['required', 'max:40'],
        ]));

        return redirect(route('employees.index'));
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect(route('employees.index'));
    }
}
