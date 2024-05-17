import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Employee, TeamMember, Team, DesktopPC, Laptop } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import { useState } from "react";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";
import DeletionConfirmation from "@/Components/deletion-confirmation";

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
        marginRight: "10px"
    };

    const addButtonStyle = {
        position: "fixed",
        bottom: 16,
        right: 16
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
                        data={employees}
                        actionRenderer={employee => (
                            <TableCell align="center">
                                {/* Button for Edit */}
                                <Button
                                    variant="contained"
                                    sx={tableButtonMargins}
                                    onClick={() => {
                                        setEdit(true);
                                        setEmpEdit(employee);
                                    }}
                                >
                                    EDIT
                                </Button>

                                {/* Button for Delete */}
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setDel(true);
                                        setEmpDel(employee);
                                    }}
                                >
                                    DELETE
                                </Button>
                            </TableCell>
                        )}
                    />
                </Box>
            </Card>

            {/* Button for Add */}
            <Fab variant="extended" color="primary" sx={addButtonStyle} onClick={() => setAdd(true)}>
                Add employee
            </Fab>

            {/* Forms for Adding, Editing and Deleting */}
            <AddEmployee
                isOpen={add}
                handleClose={() => setAdd(false)}
                teams={teams}
                equipment={equipment.filter(e => e.employee_id == null)}
            />
            <EditEmployee
                isOpen={edit}
                handleClose={() => setEdit(false)}
                employee={empEdit}
                equipment={equipment}
                onSubmit={(e, form) => {
                    e.preventDefault();
                    if (empEdit) {
                        form.patch(route("employees.update", empEdit.id));
                    }
                    setEdit(false);
                }}
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
