import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Employee, DesktopPC, Laptop } from "@/types";
import React from "react";
import { Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";

const Employees = ({
    employees,
    desktops,
    laptops
}: PageProps<{
    employees: PaginatedResponse<Employee>;
    desktops: PaginatedResponse<DesktopPC>;
    laptops: PaginatedResponse<Laptop>;
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

    const equipment: (DesktopPC | Laptop)[] = Array.prototype.concat(desktops.data, laptops.data);

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
            <AddEmployee isOpen={add} handleClose={() => setAdd(false)} equipment={equipment} />

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
            />
        </GuestLayout>
    );
};

export default Employees;
