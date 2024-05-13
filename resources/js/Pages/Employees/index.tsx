import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Employee } from "@/types";
import React from "react";
import { Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { useState } from "react";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";
import DeleteEmployee from "./DeleteEmployee";

const Employees = ({ employees }: PageProps<{ employees: PaginatedResponse<Employee> }>) => {
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
            </Card>
            <Fab variant="extended" color="primary" sx={addButtonStyle} onClick={() => setAdd(true)}>
                Add employee
            </Fab>
            <AddEmployee isOpen={add} handleClose={() => setAdd(false)} />

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
            />
            {empDel && <DeleteEmployee isOpen={del} handleClose={() => setDel(false)} employee={empDel} />}
        </GuestLayout>
    );
};

export default Employees;
