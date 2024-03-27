import GuestLayout from "@/Layouts/GuestLayout";
import {PageProps, PaginatedResponse, Employee} from "@/types";
import React from "react";
import {Button, Card, Fab, TableCell} from "@mui/material";
import {Table} from "@/Components/table/table";

const Employees = ({ employees }: PageProps<{ employees: PaginatedResponse<Employee> }>) => {
    const tableButtonMargins = {
        marginRight: "10px"
    }

    const addButtonStyle = {
        position: 'fixed',
        bottom: 16,
        right: 16,
    };

    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table <Employee>
                    data={employees}
                    actionRenderer={() =>
                        (
                            <TableCell align="center">
                                <Button variant="contained" sx={tableButtonMargins}>
                                    EDIT
                                </Button>
                                <Button variant="contained" color="error">
                                    DELETE
                                </Button>
                            </TableCell>
                        )
                    }
                />
            </Card>
            <Fab variant="extended" color="primary" sx={addButtonStyle}>
                Add employee
            </Fab>
        </GuestLayout>
    );
};

export default Employees;
