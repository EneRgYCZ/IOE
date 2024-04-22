import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Team } from "@/types";
import React from "react";
import { Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { Link } from "@inertiajs/react";
import TeamEditForm from "@/Components/teams/teams-update";
import TeamCreateForm from "@/Components/teams/teams-create";

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
                    actionRenderer={team => (
                        <TableCell align="center">
                            <Button variant="contained">VIEW</Button>
                            <TeamEditForm team={team}/>
                            <Link href={route('teams.destroy', team.id)} method="delete">
                                <Button variant="contained" color="error">
                                    DELETE
                                </Button>
                            </Link>
                        </TableCell>
                    )}
                />
            </Card>
            <TeamCreateForm/>
        </GuestLayout>
    );
};

export default Teams;
