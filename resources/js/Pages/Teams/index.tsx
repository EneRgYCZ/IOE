import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, PageProps, PaginatedResponse, Team, TeamMember } from "@/types";
import React from "react";
import { Box, Card, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import TeamView from "@/Components/teams/teams-view";
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
            <Card variant="outlined" sx={{ width: "70%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h4" sx={{ m: 2 }}>
                        Teams
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", alignItems: "center" }}>
                    <Table<Team>
                        data={teams}
                        actionRenderer={team => (
                            <TableCell style={{ display: "flex", justifyContent: "center" }}>
                                <TeamView
                                    team={team}
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
                </Box>
            </Card>
            <TeamCreateForm employees={employees} />
        </GuestLayout>
    );
};

export default Teams;
