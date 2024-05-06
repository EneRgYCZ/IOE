import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, PageProps, PaginatedResponse, Team } from "@/types";
import React from "react";
import { Button, Card, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { Link } from "@inertiajs/react";
import TeamEditForm from "@/Components/teams/teams-update";
import TeamCreateForm from "@/Components/teams/teams-create";
import TeamDeleteConfirmation from "@/Components/teams/teams-delete";

const Teams = ({ teams, employees }: PageProps<{ 
    teams: PaginatedResponse<Team>;
    employees: Employee[];
}>) => {
    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<Team>
                    data={teams}
                    actionRenderer={team => (
                        <TableCell style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained">VIEW</Button>
                            <TeamEditForm team={team} employees={employees}/>
                            <TeamDeleteConfirmation team={team}/>
                        </TableCell>
                    )}
                />
            </Card>
            <TeamCreateForm employees={employees}/>
        </GuestLayout>
    );
};

export default Teams;
