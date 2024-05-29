<?php

namespace App\Http\Controllers;

use App\Models\Desktop;
use App\Models\Employee;
use App\Models\Laptop;
use App\Models\MeetingRoomLaptop;
use App\Table\Column;
use App\Table\SearchInput;
use App\Table\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class EquipmentController extends Controller
{
    const STRING_LENGTH = 'max:50';
    const NUMBER_LENGTH = 'max_digits:5';

    /**
     * Display a listing of the resource.
     */
    public function desktopsIndex()
    {
        $globalSearchColumns = [
            'id',
            'full_number_identifier',
            'pc_number',
            'location',
            'side',
            'double_pc',
            'needs_dock',
            'status',
            'floor',
            'island_number',
            'workspace_type',
            'updated_in_q1',
            'remarks',
            'employee_id',
        ];

        $desktops = QueryBuilder::for(Desktop::query())
            ->allowedSorts('id', 'full_number_identifier', 'pc_number', 'location', 'side', 'double_pc', 'needs_dock', 'status', 'floor', 'island_number', 'workspace_type', 'updated_in_q1', 'remarks', 'employee_id')
            ->allowedFilters(
                'id',
                'full_number_identifier',
                'pc_number',
                'location',
                'side',
                'double_pc',
                'needs_dock',
                'status',
                'floor',
                'island_number',
                'workspace_type',
                'updated_in_q1',
                'remarks',
                'employee_id',
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

        return Inertia::render('Equipment/Desktop/index', [
            'desktops' => $desktops,
            'employees' => $employees,
        ])->table(function (Table $table) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('full_number_identifier', 'Full Number', sortable: true))
                ->addColumn(new Column('pc_number', 'PC Number', sortable: true))
                ->addColumn(new Column('location', 'Location', sortable: true))
                ->addColumn(new Column('side', 'Side', sortable: true))
                ->addColumn(new Column('double_pc', 'Double PC', sortable: true, hidden: true))
                ->addColumn(new Column('needs_dock', 'Needs Dock', sortable: true))
                ->addColumn(new Column('status', 'Status', sortable: true, hidden: true))
                ->addColumn(new Column('floor', 'Floor', sortable: true))
                ->addColumn(new Column('island_number', 'Island Number', sortable: true, hidden: true))
                ->addColumn(new Column('workspace_type', 'Workspace Type', sortable: true))
                ->addColumn(new Column('updated_in_q1', 'Updated in Q1', sortable: true))
                ->addColumn(new Column('remarks', 'Remarks', sortable: true, hidden: true))
                ->addColumn(new Column('employee_id', 'Employee Id', sortable: true))
                ->addSearchInput(new SearchInput('full_number_identifier', 'Full Number', shown: true))
                ->addSearchInput(new SearchInput('pc_number', 'PC Number', shown: true))
                ->addSearchInput(new SearchInput('location', 'Location', shown: true))
                ->addSearchInput(new SearchInput('side', 'Side', shown: true))
                ->addSearchInput(new SearchInput('double_pc', 'Double PC', shown: true))
                ->addSearchInput(new SearchInput('needs_dock', 'Needs Dock', shown: true))
                ->addSearchInput(new SearchInput('status', 'Status', shown: true))
                ->addSearchInput(new SearchInput('floor', 'Floor', shown: true))
                ->addSearchInput(new SearchInput('island_number', 'Island Number', shown: true))
                ->addSearchInput(new SearchInput('workspace_type', 'Workspace Type', shown: true))
                ->addSearchInput(new SearchInput('updated_in_q1', 'Updated in Q1', shown: true))
                ->addSearchInput(new SearchInput('remarks', 'Remarks', shown: true))
                ->addSearchInput(new SearchInput('employee_id', 'Employee Id', shown: true))
                ->addSearchInput(new SearchInput('global_search', 'Global Search', shown: false));
        });
    }

    public function laptopsIndex()
    {
        $globalSearchColumns = [
            'id',
            'full_number_identifier',
            'laptop_number',
            'location',
            'side',
            'status',
            'floor',
            'island_number',
            'workspace_type',
            'updated_in_q1',
            'remarks',
            'employee_id',
        ];

        $laptops = QueryBuilder::for(Laptop::query())
            ->allowedSorts('id', 'full_number_identifier', 'laptop_number', 'location', 'side', 'status', 'floor', 'island_number', 'workspace_type', 'updated_in_q1', 'remarks', 'employee_id')
            ->allowedFilters(
                'id',
                'full_number_identifier',
                'laptop_number',
                'location',
                'side',
                'status',
                'floor',
                'island_number',
                'workspace_type',
                'updated_in_q1',
                'remarks',
                'employee_id',
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

        return Inertia::render('Equipment/Laptop/index', [
            'laptops' => $laptops,
            'employees' => $employees,
        ])->table(function (Table $table) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('full_number_identifier', 'Full Number', sortable: true))
                ->addColumn(new Column('laptop_number', 'Laptop Number', sortable: true))
                ->addColumn(new Column('location', 'Location', sortable: true))
                ->addColumn(new Column('side', 'Side', sortable: true))
                ->addColumn(new Column('status', 'Status', sortable: true, hidden: true))
                ->addColumn(new Column('floor', 'Floor', sortable: true))
                ->addColumn(new Column('island_number', 'Island Number', sortable: true))
                ->addColumn(new Column('workspace_type', 'Workspace Type', sortable: true))
                ->addColumn(new Column('updated_in_q1', 'Updated in Q1', sortable: true, hidden: true))
                ->addColumn(new Column('remarks', 'Remarks', sortable: true, hidden: true))
                ->addColumn(new Column('employee_id', 'Employee Id', sortable: true))
                ->addSearchInput(new SearchInput('full_number_identifier', 'Full Number', shown: true))
                ->addSearchInput(new SearchInput('laptop_number', 'Laptop Number', shown: true))
                ->addSearchInput(new SearchInput('location', 'Location', shown: true))
                ->addSearchInput(new SearchInput('side', 'Side', shown: true))
                ->addSearchInput(new SearchInput('status', 'Status', shown: true))
                ->addSearchInput(new SearchInput('floor', 'Floor', shown: true))
                ->addSearchInput(new SearchInput('island_number', 'Island Number', shown: true))
                ->addSearchInput(new SearchInput('workspace_type', 'Workspace Type', shown: true))
                ->addSearchInput(new SearchInput('updated_in_q1', 'Updated in Q1', shown: true))
                ->addSearchInput(new SearchInput('remarks', 'Remarks', shown: true))
                ->addSearchInput(new SearchInput('employee_id', 'Employee Id', shown: true))
                ->addSearchInput(new SearchInput('global_search', 'Global Search', shown: false));
        });
    }

    public function meetingRoomLaptopIndex()
    {
        $globalSearchColumns = [
            'id',
            'full_number_identifier',
            'laptop_number',
            'location',
            'side',
            'floor',
            'room_number',
            'updated_in_q1',
            'remarks',
        ];

        $meetingRoomLaptops = QueryBuilder::for(MeetingRoomLaptop::query())
            ->allowedSorts('id', 'full_number_identifier', 'laptop_number', 'location', 'side', 'floor', 'room_number', 'updated_in_q1', 'remarks')
            ->allowedFilters(
                'id',
                'full_number_identifier',
                'laptop_number',
                'location',
                'side',
                'floor',
                'room_number',
                'updated_in_q1',
                'remarks',
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

        return Inertia::render('Equipment/MeetingRoomLaptop/index', [
            'meetingRoomLaptops' => $meetingRoomLaptops,
        ])->table(function (Table $table) {
            $table
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('full_number_identifier', 'Full Number', sortable: true))
                ->addColumn(new Column('laptop_number', 'Laptop Number', sortable: true))
                ->addColumn(new Column('location', 'Location', sortable: true))
                ->addColumn(new Column('side', 'Side', sortable: true))
                ->addColumn(new Column('floor', 'Floor', sortable: true))
                ->addColumn(new Column('room_number', 'Room Number', sortable: true))
                ->addColumn(new Column('updated_in_q1', 'Updated in Q1', sortable: true))
                ->addColumn(new Column('remarks', 'Remarks', sortable: true, hidden: true))
                ->addSearchInput(new SearchInput('full_number_identifier', 'Full Number', shown: true))
                ->addSearchInput(new SearchInput('laptop_number', 'Laptop Number', shown: true))
                ->addSearchInput(new SearchInput('location', 'Location', shown: true))
                ->addSearchInput(new SearchInput('side', 'Side', shown: true))
                ->addSearchInput(new SearchInput('floor', 'Floor', shown: true))
                ->addSearchInput(new SearchInput('room_number', 'Room Number', shown: true))
                ->addSearchInput(new SearchInput('updated_in_q1', 'Updated in Q1', shown: true))
                ->addSearchInput(new SearchInput('remarks', 'Remarks', shown: true))
                ->addSearchInput(new SearchInput('global_search', 'Global Search', shown: false));
        });
    }

    private static function validateDesktop(Request $desktop)
    {
        return $desktop->validate([
            'full_number_identifier' => ['required', self::STRING_LENGTH],
            'pc_number' => ['required', self::STRING_LENGTH],
            'location' => ['required', Rule::in(['ghh', 'waagstraat'])],
            'side' => ['required', Rule::in(['north', 'south'])],
            'double_pc' => ['boolean'],
            'needs_dock' => ['boolean'],
            'status' => [Rule::in(['static', 'flex', ''])],
            'floor' => ['numeric', 'required', self::NUMBER_LENGTH],
            'island_number' => ['numeric', 'required', self::NUMBER_LENGTH],
            'workspace_type' => [Rule::in(['developer', 'non-developer'])],
            'updated_in_q1' => ['boolean'],
            'remarks' => [],
            'employee_id' => [],
        ]);
    }

    private static function validateLaptop(Request $laptop)
    {
        return $laptop->validate([
            'full_number_identifier' => ['required', self::STRING_LENGTH],
            'laptop_number' => ['required', self::STRING_LENGTH],
            'location' => ['required', Rule::in(['ghh', 'waagstraat'])],
            'side' => ['required', Rule::in(['north', 'south'])],
            'status' => [Rule::in(['static', 'flex', ''])],
            'floor' => ['numeric', 'required', self::NUMBER_LENGTH],
            'island_number' => ['numeric', 'required', self::NUMBER_LENGTH],
            'workspace_type' => [Rule::in(['developer', 'non-developer'])],
            'updated_in_q1' => ['boolean'],
            'remarks' => [],
            'employee_id' => [],
        ]);
    }

    private static function validateMeetingRoomLaptop(Request $meetingRoomLaptop)
    {
        return $meetingRoomLaptop->validate([
            'full_number_identifier' => ['required', self::STRING_LENGTH],
            'laptop_number' => ['required', self::STRING_LENGTH],
            'location' => ['required', Rule::in(['ghh', 'waagstraat'])],
            'side' => ['required', Rule::in(['north', 'south'])],
            'floor' => ['numeric', 'required', self::NUMBER_LENGTH],
            'room_number' => ['max:5'],
            'updated_in_q1' => ['boolean'],
            'remarks' => [],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeDesktop(Request $request)
    {
        Desktop::create(self::validateDesktop($request));

        return redirect(route('equipment.desktops'));
    }

    public function storeLaptop(Request $request)
    {
        Laptop::create(self::validateLaptop($request));
    }

    public function storeMeetingRoomLaptop(Request $request)
    {
        MeetingRoomLaptop::create(self::validateMeetingRoomLaptop($request));
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDesktop(Request $request, Desktop $desktop)
    {
        $desktop->update(self::validateDesktop($request));
    }

    public function updateLaptop(Request $request, Laptop $laptop)
    {
        $laptop->update(self::validateLaptop($request));
    }

    public function updateMeetingRoomLaptop(Request $request, MeetingRoomLaptop $meetingRoomLaptop)
    {
        $meetingRoomLaptop->update(self::validateMeetingRoomLaptop($request));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyDesktop(Desktop $desktop)
    {
        $desktop->delete();
    }

    public function destroyLaptop(Laptop $laptop)
    {
        $laptop->delete();
    }

    public function destroyMeetingRoomLaptop(MeetingRoomLaptop $meetingRoomLaptop)
    {
        $meetingRoomLaptop->delete();
    }
}
