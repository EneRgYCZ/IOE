import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Employee, TeamMember, Team, DesktopPC, Laptop } from "@/types";
import React, { useState } from "react";
import { Box, Card, TableCell, Typography } from "@mui/material";
import { CellRenderer, Table, defaultCellRenderer } from "@/Components/table/table";
import EmployeeForm from "../../Components/crud-forms/employee-form";
import DeletionConfirmation from "@/Components/crud-forms/deletion-confirmation";
import AddButton from "@/Components/form-components/add-button";
import dayjs from "dayjs";
import TableActions from "@/Components/table/table-actions";

const Employees = ({
    employees,
    teams,
    team_members,
    desktops,
    laptops
}: PageProps<{
    employees: PaginatedResponse<Employee>;
    teams: Team[];
    team_members: TeamMember[];
    desktops: DesktopPC[];
    laptops: Laptop[];
}>) => {
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
    const [del, setDel] = useState(false);

    const equipment: (DesktopPC | Laptop)[] = Array.prototype.concat(
        desktops.toSorted((a, b) => a.full_number_identifier.localeCompare(b.full_number_identifier)),
        laptops.toSorted((a, b) => a.full_number_identifier.localeCompare(b.full_number_identifier))
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customCellRenderer: CellRenderer<any> = (row, col, cellKey, rowIdx) => {
        if (col.key === "team_member.team") {
            const teams = row.team_member;
            return (
                <TableCell key={rowIdx} sx={{ pl: 2, textAlign: "center" }}>
                    {teams.length > 0 ? (
                        teams.map((entry: TeamMember) => (
                            <div key={entry.id}>
                                <span>&#8226;</span> {entry.team?.team_name}
                            </div>
                        ))
                    ) : (
                        <div>Unassigned</div>
                    )}
                </TableCell>
            );
        }
        if (col.key === "updated_at" || col.key === "created_at") {
            return (
                <TableCell
                    key={cellKey}
                    sx={{ pl: 2, maxHeight: "50px", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                    {dayjs(row[col.key]).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
            );
        }
        return defaultCellRenderer(row, col, cellKey, rowIdx);
    };

    return (
        <GuestLayout>
            {/* Table display */}
            <Card variant="outlined" sx={{ width: "70%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h4" sx={{ m: 2 }}>
                        Employees
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", alignItems: "center" }}>
                    <Table<Employee>
                        data={employees}
                        cellRenderer={customCellRenderer}
                        actionRenderer={employee => (
                            <TableActions
                                current={employee}
                                setCurrent={setCurrentEmployee}
                                setEditFormOpen={() => {
                                    setEdit(true);
                                }}
                                setDeleteFormOpen={() => {
                                    setDel(true);
                                }}
                            />
                        )}
                    />
                </Box>
            </Card>

            {/* Button for Add */}
            <AddButton label="Add employee" onClick={() => setAdd(true)} />

            {/* Forms for Adding, Editing and Deleting */}
            <EmployeeForm
                isOpen={add}
                handleClose={() => setAdd(false)}
                employee={null}
                teams={teams}
                teamMembers={[]}
                equipment={equipment.filter(e => e.employee_id == null)}
                title="Add Employee"
            />
            <EmployeeForm
                isOpen={edit}
                handleClose={() => setEdit(false)}
                employee={currentEmployee}
                teams={teams}
                teamMembers={
                    team_members && currentEmployee
                        ? teams.filter(team =>
                              team.id
                                  ? team_members
                                        .filter(relation => relation.employee_id == currentEmployee.id)
                                        .map(relation => relation.team_id)
                                        .includes(team.id)
                                  : null
                          )
                        : []
                }
                equipment={equipment}
                title="Edit Employee"
            />
            {currentEmployee && (
                <DeletionConfirmation
                    isOpen={del}
                    handleClose={() => setDel(false)}
                    deleteObject={currentEmployee}
                    type="Employee"
                />
            )}
        </GuestLayout>
    );
};

export default Employees;
