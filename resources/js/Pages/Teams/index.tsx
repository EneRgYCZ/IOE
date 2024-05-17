import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, PageProps, PaginatedResponse, Team, TeamMember } from "@/types";
import React from "react";
import { Box, Button, Card, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import TeamEditForm from "@/Components/teams/teams-update";
import TeamCreateForm from "@/Components/teams/teams-create";
import DeletionConfirmation from "@/Components/deletion-confirmation";

const Teams = ({
    teams,
    employees,
    team_members
}: PageProps<{
    teams: PaginatedResponse<Team>;
    employees: Employee[];
    team_members: TeamMember[];
}>) => {
    const [formOpen, setFormOpen] = React.useState({
        addTeam: false,
        editTeam: false,
        deleteTeam: false
    });

    const [currentTeam, setCurrentTeam] = React.useState<Team | null>(null);

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

                                {/* Button for Delete */}
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setCurrentTeam(team);
                                        setFormOpen({ ...formOpen, deleteTeam: true });
                                    }}
                                >
                                    DELETE
                                </Button>
                            </TableCell>
                        )}
                    />
                </Box>
            </Card>
            <TeamCreateForm employees={employees} />

            {/* Forms for Deleting */}
            {currentTeam && (
                <DeletionConfirmation
                    isOpen={formOpen.deleteTeam}
                    handleClose={() => setFormOpen({ ...formOpen, deleteTeam: false })}
                    deleteObject={currentTeam}
                    type="Team"
                />
            )}
        </GuestLayout>
    );
};

export default Teams;
