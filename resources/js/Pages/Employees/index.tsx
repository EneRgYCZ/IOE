import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Employee } from "@/types";
import React from "react";
import { Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import {Link} from "@inertiajs/react";
import { link } from "fs";


const Employees = ({ employees }: PageProps<{ employees: PaginatedResponse<Employee> }>) => {
    const tableButtonMargins = {
        marginRight: "10px"
    };

    const addButtonStyle = {
        position: "fixed",
        bottom: 16,
        right: 16
    };

    // const handleClick=(employee: { id: any; })=> {
    //     console.log("Button Clicked")
    //     console.log(employee.id)
        
    // }

    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<Employee>
                    
                    data={employees}
                    actionRenderer={(employee: { id: any; }) => (
                        <TableCell align="center">
                            <Button variant="contained" sx={tableButtonMargins}>
                                EDIT
                            </Button>
                            <Link href={route("employee.destroy", employee.id)} method="delete">
                            <Button variant="contained" color="error">
                                DELETE
                            </Button>
                            </Link>
                           
                        </TableCell>
                    )}
                />
            </Card>
            <Fab variant="extended" color="primary" sx={addButtonStyle} >
                Add employee
            </Fab>
        </GuestLayout>
    );
};

export default Employees;
