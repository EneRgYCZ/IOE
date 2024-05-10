import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, PageProps, PaginatedResponse, Team, TeamMember } from "@/types";
import React from "react";
import { Button, Card, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import TeamEditForm from "@/Components/teams/teams-update";
import TeamCreateForm from "@/Components/teams/teams-create";
import TeamDeleteConfirmation from "@/Components/teams/teams-delete";

const Teams = ({
    teams,
    employees,
    team_members
}: PageProps<{
    teams: PaginatedResponse<Team>;
    employees: Employee[];
    team_members: TeamMember[];
}>) => {
    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<Team>
                    data={teams}
                    actionRenderer={team => (
                        <TableCell style={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="contained">VIEW</Button>
                            <TeamEditForm
                                team={team}
                                employees={employees}
                                teamMembers={
                                    team_members
                                        ? employees.filter(employee =>
                                              team_members
                                                  .filter(relation => relation.team_id == team.id)
                                                  .map(relation => relation.employee_id)
                                                  .includes(employee.id)
                                          )
                                        : []
                                }
                            />
                            <TeamDeleteConfirmation team={team} />
                        </TableCell>
                    )}
                />
            </Card>
            <TeamCreateForm employees={employees} />
        </GuestLayout>
    );
};

export default Teams;
