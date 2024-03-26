import React from "react";

import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, PageProps, PaginatedResponse } from "@/types";

import { Table } from "@/Components/table/table";
import { Button, Card, TableCell } from "@mui/material";

export default function Dashboard({ employees }: PageProps<{ employees: PaginatedResponse<Employee> }>) {
    { /* This is an example of how to use the table component */}
    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<Employee>
                    data={employees}
                    actionRenderer={employee => { // This is the object for each row
                        return (
                            <TableCell align="center">
                                <Button variant="contained">Button1</Button>

                                <Button variant="contained" color="error">
                                    Button2
                                </Button>
                            </TableCell>
                        );
                    }}
                />
            </Card>
        </GuestLayout>
    );
}
