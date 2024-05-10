import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Employee, TeamMember, Team } from "@/types";
import React from "react";
import { Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";

const Employees = ({ 
    employees, 
    teams,
    team_members, 
}: PageProps<{ 
    employees: PaginatedResponse<Employee>; 
    teams: Team[];
    team_members: TeamMember[]; 
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

    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<Employee>
                    data={employees}
                    actionRenderer={employee => (
                        <TableCell align="center">
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
                            <Link href={route("employees.destroy", employee.id)} method="delete">
                                <Button variant="contained" color="error">
                                    DELETE
                                </Button>
                            </Link>
                        </TableCell>
                    )}
                />
            </Card>
            <Fab variant="extended" color="primary" sx={addButtonStyle} onClick={() => setAdd(true)}>
                Add employee
            </Fab>
            <AddEmployee isOpen={add} handleClose={() => setAdd(false)} teams={teams}/>

            <EditEmployee
                isOpen={edit}
                handleClose={() => setEdit(false)}
                employee={empEdit}
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
        </GuestLayout>
    );
};

export default Employees;
