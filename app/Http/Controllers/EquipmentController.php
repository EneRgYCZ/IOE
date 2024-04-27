<?php

namespace App\Http\Controllers;

use App\Models\Desktop;
use App\Models\Laptop;
use App\Models\MeetingRoomLaptop;
use App\Table\Column;
use App\Table\SearchInput;
use App\Table\Table;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $desktops = QueryBuilder::for(Desktop::query())
            ->allowedSorts('id', 'serial_number', 'double_pc', 'needs_dock', 'status', 'floor', 'island_number', 'type', 'updated_in_q1', 'employee_id')
            ->allowedFilters(
                'id',
                'serial_number',
                'double_pc',
                'needs_dock',
                'status',
                'floor',
                'island_number',
                'type',
                'updated_in_q1',
                'employee_id',
            )
            ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
            ->withQueryString();

        $laptops = QueryBuilder::for(Laptop::query())
            ->allowedSorts('id', 'serial_number', 'status', 'floor', 'island_number', 'workspace_type', 'updated_in_q1', 'employee_id')
            ->allowedFilters(
                'id',
                'serial_number',
                'status',
                'floor',
                'island_number',
                'workspace_type',
                'updated_in_q1',
                'employee_id',
            )
            ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
            ->withQueryString();

        $meetingRoomLaptops = QueryBuilder::for(MeetingRoomLaptop::query())
            ->allowedSorts('id', 'serial_number', 'floor', 'room_number', 'updated_in_q1')
            ->allowedFilters(
                'id',
                'serial_number',
                'floor',
                'room_number',
                'updated_in_q1',
            )
            ->paginate(request('perPage') ?? Table::DEFAULT_PER_PAGE)
            ->withQueryString();

        return Inertia::render('Equipment/index', [
            'desktops' => $desktops,
            'laptops' => $laptops,
            'meetingRoomLaptops' => $meetingRoomLaptops,
        ])->table(function (Table $table) {
            $table->setName('desktops')
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('serial_number', 'Serial Number', sortable: true))
                ->addColumn(new Column('double_pc', 'Double PC', sortable: true, hidden: true))
                ->addColumn(new Column('needs_dock', 'Needs Dock', sortable: true))
                ->addColumn(new Column('status', 'Status', sortable: true, hidden: true))
                ->addColumn(new Column('floor', 'Floor', sortable: true))
                ->addColumn(new Column('island_number', 'Island Number', sortable: true, hidden: true))
                ->addColumn(new Column('type', 'Type', sortable: true))
                ->addColumn(new Column('updated_in_q1', 'Updated in Q1', sortable: false))
                ->addColumn(new Column('employee_id', 'Employee Id', sortable: true))
                ->addSearchInput(new SearchInput('serial_number', 'Serial Number', shown: true))
                ->addSearchInput(new SearchInput('double_pc', 'Double PC', shown: false))
                ->addSearchInput(new SearchInput('needs_dock', 'Needs Dock', shown: true))
                ->addSearchInput(new SearchInput('status', 'Status', shown: false))
                ->addSearchInput(new SearchInput('floor', 'Floor', shown: true))
                ->addSearchInput(new SearchInput('island_number', 'Island Number', shown: true))
                ->addSearchInput(new SearchInput('type', 'Type', shown: true))
                ->addSearchInput(new SearchInput('updated_in_q1', 'Updated in Q1', shown: false))
                ->addSearchInput(new SearchInput('employee_id', 'Employee Id', shown: true));
        })->table(function (Table $table) {
            $table->setName('laptops')
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('serial_number', 'Serial Number', sortable: true))
                ->addColumn(new Column('status', 'Status', sortable: true, hidden: true))
                ->addColumn(new Column('floor', 'Floor', sortable: true))
                ->addColumn(new Column('island_number', 'Island Number', sortable: true))
                ->addColumn(new Column('workspace_type', 'Workspace Type', sortable: true))
                ->addColumn(new Column('updated_in_q1', 'Updated in Q1', sortable: true, hidden: true))
                ->addColumn(new Column('employee_id', 'Employee Id', sortable: true))
                ->addSearchInput(new SearchInput('serial_number', 'Serial Number', shown: true))
                ->addSearchInput(new SearchInput('status', 'Status', shown: false))
                ->addSearchInput(new SearchInput('floor', 'Floor', shown: true))
                ->addSearchInput(new SearchInput('island_number', 'Island Number', shown: true))
                ->addSearchInput(new SearchInput('workspace_type', 'Workspace Type', shown: true))
                ->addSearchInput(new SearchInput('updated_in_q1', 'Updated in Q1', shown: false))
                ->addSearchInput(new SearchInput('employee_id', 'Employee Id', shown: true));
        })->table(function (Table $table) {
            $table->setName('meetingRoomLaptops')
                ->addColumn(new Column('id', 'Id', hidden: true, sortable: true))
                ->addColumn(new Column('serial_number', 'Serial Number', sortable: true))
                ->addColumn(new Column('floor', 'Floor', sortable: true))
                ->addColumn(new Column('room_number', 'Room Number', sortable: true))
                ->addColumn(new Column('updated_in_q1', 'Updated in Q1', sortable: true))
                ->addSearchInput(new SearchInput('serial_number', 'Serial Number', shown: true))
                ->addSearchInput(new SearchInput('floor', 'Floor', shown: true))
                ->addSearchInput(new SearchInput('room_number', 'Room Number', shown: true))
                ->addSearchInput(new SearchInput('updated_in_q1', 'Updated in Q1', shown: true));
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeDesktop(Request $request)
    {
        Desktop::create($request->validate([
            'serial_number' => ['required', 'max:50'],
            'double_pc' => ['boolean'],
            'needs_dock' => ['boolean'],
            'status' => [Rule::in(['static', 'flex'])],
            'floor' => ['required', 'max:5'],
            'island_number' => ['required', 'max:5'],
            'workspace_type' => [Rule::in(['developer', 'non-developer'])],
            'updated_in_q1' => ['boolean'],
            'employee_id' => [],
        ]));

        return redirect(route('equipment.index'));
    }

    public function storeLaptop(Request $request)
    {
        Laptop::create($request->validate([
            'serial_number' => ['required', 'max:50'],
            'status' => [Rule::in(['static', 'flex'])],
            'floor' => ['required', 'max:5'],
            'island_number' => ['required', 'max:5'],
            'workspace_type' => [Rule::in(['developer', 'non-developer'])],
            'updated_in_q1' => ['boolean'],
            'employee_id' => [],
        ]));

        return redirect(route('equipment.index'));
    }

    public function storeMeetingRoomLaptop(Request $request)
    {
        MeetingRoomLaptop::create($request->validate([
            'serial_number' => ['required', 'max:50'],
            'floor' => ['required', 'max:5'],
            'room_number' => ['required', 'max:5'],
            'updated_in_q1' => ['boolean'],
        ]));

        return redirect(route('equipment.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDesktop(Request $request, Desktop $desktop)
    {
        $desktop->update($request->validate([
            'serial_number' => ['required', 'max:50'],
            'double_pc' => ['boolean'],
            'needs_dock' => ['boolean'],
            'status' => [Rule::in(['static', 'flex'])],
            'floor' => ['required', 'max:5'],
            'island_number' => ['required', 'max:5'],
            'workspace_type' => [Rule::in(['developer', 'non-developer'])],
            'updated_in_q1' => ['boolean'],
            'employee_id' => [],
        ]));

        return redirect(route('equipment.index'));
    }

    public function updateLaptop(Request $request, Laptop $laptop)
    {
        $laptop->update($request->validate([
            'serial_number' => ['required', 'max:50'],
            'status' => [Rule::in(['static', 'flex'])],
            'floor' => ['required', 'max:5'],
            'island_number' => ['required', 'max:5'],
            'workspace_type' => [Rule::in(['developer', 'non-developer'])],
            'updated_in_q1' => ['boolean'],
            'employee_id' => [],
        ]));

        return redirect(route('equipment.index'));
    }

    public function updateMeetingRoomLaptop(Request $request, MeetingRoomLaptop $meetingRoomLaptop)
    {
        $meetingRoomLaptop->update($request->validate([
            'serial_number' => ['required', 'max:50'],
            'floor' => ['required', 'max:5'],
            'room_number' => ['required', 'max:5'],
            'updated_in_q1' => ['boolean'],
        ]));

        return redirect(route('equipment.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyDesktop(Desktop $desktop)
    {
        $desktop->delete();

        return redirect(route('equipment.index'));
    }

    public function destroyLaptop(Laptop $laptop)
    {
        $laptop->delete();

        return redirect(route('equipment.index'));
    }

    public function destroyMeetingRoomLaptop(MeetingRoomLaptop $meetingRoomLaptop)
    {
        $meetingRoomLaptop->delete();

        return redirect(route('equipment.index'));
    }
}
