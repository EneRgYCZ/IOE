import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Employee, TeamMember, Team, DesktopPC, Laptop } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import { useState } from "react";
import EmployeeForm from "../../Components/forms/employee-form";
import DeletionConfirmation from "@/Components/forms/deletion-confirmation";
import { EditRounded, DeleteRounded } from "@mui/icons-material";

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
    const tableButtonMargins = {
        margin: "0 10px"
    };

    const addButtonBox = {
        position: "fixed",
        width: "250px",
        pointerEvents: "none",
        bottom: 16,
        right: 16
    };

    const addButtonStyle = {
        display: "block",
        pointerEvents: "initial",
        marginTop: "16px",
        marginLeft: "auto"
    };

    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [empEdit, setEmpEdit] = useState<Employee | null>(null);
    const [del, setDel] = useState(false);
    const [empDel, setEmpDel] = useState<Employee | null>(null);

    const equipment: (DesktopPC | Laptop)[] = Array.prototype.concat(
        desktops.sort((a, b) => a.full_number_identifier.localeCompare(b.full_number_identifier)),
        laptops.sort((a, b) => a.full_number_identifier.localeCompare(b.full_number_identifier))
    );

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
                        minWidth={200}
                        data={employees}
                        actionRenderer={employee => (
                            <TableCell align="center">
                                {/* Button for Edit */}
                                <Button
                                    variant="outlined"
                                    sx={tableButtonMargins}
                                    onClick={() => {
                                        setEdit(true);
                                        setEmpEdit(employee);
                                    }}
                                >
                                    EDIT
                                    <EditRounded sx={{ marginLeft: "10px" }} />
                                </Button>

                                {/* Button for Delete */}
                                <Button
                                    variant="outlined"
                                    sx={tableButtonMargins}
                                    color="error"
                                    onClick={() => {
                                        setDel(true);
                                        setEmpDel(employee);
                                    }}
                                >
                                    <DeleteRounded />
                                </Button>
                            </TableCell>
                        )}
                    />
                </Box>
            </Card>

            {/* Button for Add */}
            <Box sx={addButtonBox}>
                <Fab variant="extended" color="primary" sx={addButtonStyle} onClick={() => setAdd(true)}>
                    Add employee
                </Fab>
            </Box>

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
                employee={empEdit}
                teams={teams}
                teamMembers={
                    team_members && empEdit
                        ? teams.filter(team =>
                              team_members
                                  .filter(relation => relation.employee_id == empEdit.id)
                                  .map(relation => relation.team_id)
                                  .includes(team.id)
                          )
                        : []
                }
                equipment={equipment}
                title="Edit Employee"
            />
            {empDel && (
                <DeletionConfirmation
                    isOpen={del}
                    handleClose={() => setDel(false)}
                    deleteObject={empDel}
                    type="Employee"
                />
            )}
        </GuestLayout>
    );
};

export default Employees;
