<?php

namespace App\Http\Controllers;

use App\Enum\ToastType;
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

    const FIELDS = [
        ['full_number_identifier', 'Full Number', false],
        ['location', 'Location', false],
        ['side', 'Side', false],
        ['floor', 'Floor', false],
        ['q1', 'Updated in Q1', false],
        ['remarks', 'Remarks', true],
        ['updated_at', 'Updated At', false],
        ['created_at', 'Created At', false],
    ];

    private static function addColumnsAndSearch(Table $table, array $fields)
    {
        $table->addColumn(new Column('id', 'Id', hidden: true, sortable: true));

        foreach ($fields as $field) {
            $table->addColumn(new Column($field[0], $field[1], hidden: $field[2], sortable: true));
            $table->addSearchInput(new SearchInput($field[0], $field[1], shown: true));
        }

        $table->addSearchInput(new SearchInput('global_search', 'Global Search', shown: false));
    }

    /**
     * Display a listing of the resource.
     */
    public function desktopsIndex()
    {
        $desktopColumns = [
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
            'q1',
            'remarks',
            'employee_id',
            'updated_at',
            'created_at',
        ];

        $desktops = QueryBuilder::for(Desktop::query())
            ->with('employee')
            ->allowedSorts($desktopColumns)
            ->allowedFilters(
                ...array_merge($desktopColumns,
                    [AllowedFilter::callback('global_search', function (Builder $query, $value) use ($desktopColumns) {
                        $query->where(function ($subQuery) use ($desktopColumns, $value) {
                            foreach ($desktopColumns as $column) {
                                if (is_array($value)) {
                                    $value = implode('', $value);
                                }
                                $subQuery->orWhere($column, 'like', "%{$value}%");
                            }
                        });
                    })]
                )
            )
            ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
            ->withQueryString();

        $employees = Employee::query()->get();

        return Inertia::render('Equipment/Desktop/index', [
            'desktops' => $desktops,
            'employees' => $employees,
        ])->table(function (Table $table) {
            $specific_fields = [
                ['pc_number', 'PC Number', false],
                ['double_pc', 'Double PC', true],
                ['needs_dock', 'Needs Dock', false],
                ['status', 'Status', true],
                ['island_number', 'Island Number', true],
                ['workspace_type', 'Workspace Type', false],
                ['employee_id', 'Employee Id', false],
            ];
            $fields = array_merge(self::FIELDS, $specific_fields);
            self::addColumnsAndSearch($table, $fields);
        });
    }

    public function laptopsIndex()
    {
        $laptopColumns = [
            'id',
            'full_number_identifier',
            'laptop_number',
            'location',
            'side',
            'status',
            'floor',
            'island_number',
            'workspace_type',
            'q1',
            'remarks',
            'employee_id',
            'updated_at',
            'created_at',
        ];

        $laptops = QueryBuilder::for(Laptop::query())
            ->with('employee')
            ->allowedSorts($laptopColumns)
            ->allowedFilters(
                ...array_merge($laptopColumns,
                    [AllowedFilter::callback('global_search', function (Builder $query, $value) use ($laptopColumns) {
                        $query->where(function ($subQuery) use ($laptopColumns, $value) {
                            foreach ($laptopColumns as $column) {
                                if (is_array($value)) {
                                    $value = implode('', $value);
                                }
                                $subQuery->orWhere($column, 'like', "%{$value}%");
                            }
                        });
                    })]
                )
            )
            ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
            ->withQueryString();

        $employees = Employee::query()->get();

        return Inertia::render('Equipment/Laptop/index', [
            'laptops' => $laptops,
            'employees' => $employees,
        ])->table(function (Table $table) {
            $specific_fields = [
                ['laptop_number', 'Laptop Number', false],
                ['status', 'Status', true],
                ['island_number', 'Island Number', false],
                ['workspace_type', 'Workspace Type', false],
                ['employee_id', 'Employee Id', false],
            ];
            $fields = array_merge(self::FIELDS, $specific_fields);
            self::addColumnsAndSearch($table, $fields);
        });
    }

    public function meetingRoomLaptopIndex()
    {
        $meetingRoomLaptopColumns = [
            'id',
            'full_number_identifier',
            'laptop_number',
            'location',
            'side',
            'floor',
            'room_number',
            'q1',
            'remarks',
            'updated_at',
            'created_at',
        ];

        $meetingRoomLaptops = QueryBuilder::for(MeetingRoomLaptop::query())
            ->allowedSorts($meetingRoomLaptopColumns)
            ->allowedFilters(
                ...array_merge($meetingRoomLaptopColumns,
                    [AllowedFilter::callback('global_search',
                        function (Builder $query, $value) use ($meetingRoomLaptopColumns) {
                            $query->where(function ($subQuery) use ($meetingRoomLaptopColumns, $value) {
                                foreach ($meetingRoomLaptopColumns as $column) {
                                    if (is_array($value)) {
                                        $value = implode('', $value);
                                    }
                                    $subQuery->orWhere($column, 'like', "%{$value}%");
                                }
                            });
                        })]
                )
            )
            ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
            ->withQueryString();

        return Inertia::render('Equipment/MeetingRoomLaptop/index', [
            'meetingRoomLaptops' => $meetingRoomLaptops,
        ])->table(function (Table $table) {
            $specific_fields = [
                ['laptop_number', 'Laptop Number', false],
                ['room_number', 'Room Number', false],
            ];
            $fields = array_merge(self::FIELDS, $specific_fields);
            self::addColumnsAndSearch($table, $fields);
        });
    }

    private static function validateDesktop(Request $desktop)
    {
        return $desktop->validate([
            'full_number_identifier' => ['required', self::STRING_LENGTH],
            'pc_number' => ['required', self::STRING_LENGTH],
            'location' => ['required', Rule::in(['GHH', 'Waagstraat'])],
            'side' => ['required', Rule::in(['North', 'South'])],
            'double_pc' => ['boolean'],
            'needs_dock' => ['boolean'],
            'status' => [Rule::in(['static', 'flex', ''])],
            'floor' => ['numeric', 'required', self::NUMBER_LENGTH],
            'island_number' => ['numeric', 'required', self::NUMBER_LENGTH],
            'workspace_type' => [Rule::in(['Developer', 'Non-developer'])],
            'q1' => ['boolean'],
            'remarks' => [],
            'employee_id' => [],
        ]);
    }

    private static function validateLaptop(Request $laptop)
    {
        return $laptop->validate([
            'full_number_identifier' => ['required', self::STRING_LENGTH],
            'laptop_number' => ['required', self::STRING_LENGTH],
            'location' => ['required', Rule::in(['GHH', 'Waagstraat'])],
            'side' => ['required', Rule::in(['North', 'South'])],
            'status' => [Rule::in(['static', 'flex', ''])],
            'floor' => ['numeric', 'required', self::NUMBER_LENGTH],
            'island_number' => ['numeric', 'required', self::NUMBER_LENGTH],
            'workspace_type' => [Rule::in(['Developer', 'Non-developer'])],
            'q1' => ['boolean'],
            'remarks' => [],
            'employee_id' => [],
        ]);
    }

    private static function validateMeetingRoomLaptop(Request $meetingRoomLaptop)
    {
        return $meetingRoomLaptop->validate([
            'full_number_identifier' => ['required', self::STRING_LENGTH],
            'laptop_number' => ['required', self::STRING_LENGTH],
            'location' => ['required', Rule::in(['GHH', 'Waagstraat'])],
            'side' => ['required', Rule::in(['North', 'South'])],
            'floor' => ['numeric', 'required', self::NUMBER_LENGTH],
            'room_number' => ['max:5'],
            'q1' => ['boolean'],
            'remarks' => [],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeDesktop(Request $request)
    {
        Desktop::create(self::validateDesktop($request));
        $this->toast('The desktop was created successfully', ToastType::Success);
    }

    public function storeLaptop(Request $request)
    {
        Laptop::create(self::validateLaptop($request));
        $this->toast('The laptop was created successfully', ToastType::Success);
    }

    public function storeMeetingRoomLaptop(Request $request)
    {
        MeetingRoomLaptop::create(self::validateMeetingRoomLaptop($request));
        $this->toast('The meeting room laptop was created successfully', ToastType::Success);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDesktop(Request $request, Desktop $desktop)
    {
        $desktop->update(self::validateDesktop($request));
        $this->toast('The desktop was updated successfully', ToastType::Success);
    }

    public function updateLaptop(Request $request, Laptop $laptop)
    {
        $laptop->update(self::validateLaptop($request));
        $this->toast('The laptop was updated successfully', ToastType::Success);
    }

    public function updateMeetingRoomLaptop(Request $request, MeetingRoomLaptop $meetingRoomLaptop)
    {
        $meetingRoomLaptop->update(self::validateMeetingRoomLaptop($request));
        $this->toast('The meeting room laptop was updated successfully', ToastType::Success);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyDesktop(Desktop $desktop)
    {
        $desktop->delete();

        $this->toast('The desktop was deleted successfully', ToastType::Success);
    }

    public function destroyLaptop(Laptop $laptop)
    {
        $laptop->delete();

        $this->toast('The laptop was deleted successfully', ToastType::Success);
    }

    public function destroyMeetingRoomLaptop(MeetingRoomLaptop $meetingRoomLaptop)
    {
        $meetingRoomLaptop->delete();

        $this->toast('The meeting room laptop was deleted successfully', ToastType::Success);
    }
}
