import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Team } from "@/types";
import React from "react";
import { Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";

const Teams = ({ teams }: PageProps<{ teams: PaginatedResponse<Team> }>) => {
    const tableButtonMargins = {
        margin: "0 10px"
    };

    const addButtonStyle = {
        position: "fixed",
        bottom: 16,
        right: 16
    };

    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<Team>
                    data={teams}
                    actionRenderer={() => (
                        <TableCell align="center">
                            <Button variant="contained">VIEW</Button>
                            <Button variant="contained" sx={tableButtonMargins}>
                                EDIT
                            </Button>
                            <Button variant="contained" color="error">
                                DELETE
                            </Button>
                        </TableCell>
                    )}
                />
            </Card>
            <Fab variant="extended" color="primary" sx={addButtonStyle}>
                Add team
            </Fab>
        </GuestLayout>
    );
};

export default Teams;
