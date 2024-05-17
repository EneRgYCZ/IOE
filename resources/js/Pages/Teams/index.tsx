import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, PageProps, PaginatedResponse, Team, TeamMember } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import TeamForm from "@/Components/forms/TeamForm";
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
            {/* Table display */}
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
                                {/* Button for Edit */}
                                <Button
                                    variant="contained"
                                    sx={{ marginRight: "10px" }}
                                    onClick={() => {
                                        setCurrentTeam(team);
                                        setFormOpen({ ...formOpen, editTeam: true });
                                    }}
                                >
                                    EDIT
                                </Button>

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

            {/* Button for Add */}
            <Fab variant="extended" color="primary" onClick={() => setFormOpen({ ...formOpen, addTeam: true })}>
                Add Team
            </Fab>

            {/* Forms for Adding, Editing and Deleting */}

            <TeamForm
                isOpen={formOpen.addTeam}
                handleClose={() => setFormOpen({ ...formOpen, addTeam: false })}
                team={null}
                employees={employees}
                teamMembers={[]}
                title="Add Team"
            />
            {currentTeam && (
                <TeamForm
                    isOpen={formOpen.editTeam}
                    handleClose={() => setFormOpen({ ...formOpen, editTeam: false })}
                    team={currentTeam}
                    employees={employees}
                    teamMembers={
                        team_members
                            ? employees.filter(employee =>
                                  team_members
                                      .filter(relation => relation.team_id == currentTeam.id)
                                      .map(relation => relation.employee_id)
                                      .includes(employee.id)
                              )
                            : []
                    }
                    title="Update Team"
                />
            )}
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
