import GuestLayout from "@/Layouts/GuestLayout";
import { Employee, PageProps, PaginatedResponse, Team, TeamMember } from "@/types";
import React from "react";
import { Box, Card, Fab, TableCell, Typography } from "@mui/material";
import { CellRenderer, Table, defaultCellRenderer } from "@/Components/table/table";
import TeamForm from "@/Components/crud-forms/team-form";
import DeletionConfirmation from "@/Components/crud-forms/deletion-confirmation";
import TableActions from "@/Components/table/table-actions";
import dayjs from "dayjs";

const Teams = ({
    teams,
    employees,
    team_members
}: PageProps<{
    teams: PaginatedResponse<Team>;
    employees: Employee[];
    team_members: TeamMember[];
}>) => {
    const addButtonBox = {
        position: "fixed",
        width: "250px",
        pointerEvents: "none",
        bottom: 16,
        right: 16
    };

    const addButtonStyle = {
        display: "block",
        pointerEvents: "initial",
        marginTop: "16px",
        marginLeft: "auto"
    };

    const [formOpen, setFormOpen] = React.useState({
        addTeam: false,
        editTeam: false,
        deleteTeam: false
    });

    const [currentTeam, setCurrentTeam] = React.useState<Team | null>(null);

    const customCellRenderer: CellRenderer<Team> = (row, col, cellKey, rowIdx) => {
        if (col.key === "updated_at" || col.key === "created_at") {
            return (
                <TableCell
                    key={cellKey}
                    sx={{ pl: 2, maxHeight: "50px", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                    {dayjs(row[col.key]).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
            );
        }

        return defaultCellRenderer(row, col, cellKey, rowIdx);
    };

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
                        cellRenderer={customCellRenderer}
                        actionRenderer={team => (
                            <TableActions
                                current={team}
                                setCurrent={setCurrentTeam}
                                setEditFormOpen={() => {
                                    setFormOpen({ ...formOpen, editTeam: true });
                                }}
                                setDeleteFormOpen={() => {
                                    setFormOpen({ ...formOpen, deleteTeam: true });
                                }}
                            />
                        )}
                    />
                </Box>
            </Card>

            {/* Button for Add */}
            <Box sx={addButtonBox}>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={addButtonStyle}
                    onClick={() => setFormOpen({ ...formOpen, addTeam: true })}
                >
                    Add team
                </Fab>
            </Box>

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
                                  employee.id
                                      ? team_members
                                            .filter(relation => relation.team_id == currentTeam.id)
                                            .map(relation => relation.employee_id)
                                            .includes(employee.id)
                                      : null
                              )
                            : []
                    }
                    title="Edit Team"
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
