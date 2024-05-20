import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, Employee, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import AddDesktop from "@/Pages/Equipment/Desktop/AddDesktop";
import EditDesktop from "@/Pages/Equipment/Desktop/EditDesktop";
import DeletionConfirmation from "@/Components/forms/deletion-confirmation";

const Equipment = ({
    desktops,
    employees
}: PageProps<{
    desktops: PaginatedResponse<DesktopPC>;
    employees: Employee[];
}>) => {
    const tableButtonMargins = {
        margin: "0 10px"
    };

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
        addDesktop: false,
        editDesktop: false,
        deleteDesktop: false
    });

    const [currentDesktop, setCurrentDesktop] = React.useState<DesktopPC | null>(null);

    return (
        <GuestLayout>
            {/* Table display */}
            <Card variant="outlined" sx={{ width: "70%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h4" sx={{ m: 2 }}>
                        Desktops
                    </Typography>
                </Box>
                <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box sx={{ width: "100%", alignItems: "center", marginBottom: "30px" }}>
                        <Table<DesktopPC>
                            name="desktops"
                            data={desktops}
                            actionRenderer={desktop => (
                                <TableCell align="center">
                                    {/* Button for Edit */}
                                    <Button
                                        variant="contained"
                                        sx={tableButtonMargins}
                                        onClick={() => {
                                            setCurrentDesktop(desktop);
                                            setFormOpen({ ...formOpen, editDesktop: true });
                                        }}
                                    >
                                        EDIT
                                    </Button>

                                    {/* Button for Delete */}
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={tableButtonMargins}
                                        onClick={() => {
                                            setCurrentDesktop(desktop);
                                            setFormOpen({ ...formOpen, deleteDesktop: true });
                                        }}
                                    >
                                        DELETE
                                    </Button>
                                </TableCell>
                            )}
                        />
                    </Box>
                </Box>
            </Card>

            {/* Button for Add */}
            <Box sx={addButtonBox}>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={addButtonStyle}
                    onClick={() => setFormOpen({ ...formOpen, addDesktop: true })}
                >
                    Add desktop
                </Fab>
            </Box>

            {/* Forms for Adding, Editing and Deleting */}
            <AddDesktop
                isOpen={formOpen.addDesktop}
                handleClose={() => setFormOpen({ ...formOpen, addDesktop: false })}
                employees={employees}
            ></AddDesktop>
            <EditDesktop
                isOpen={formOpen.editDesktop}
                handleClose={() => setFormOpen({ ...formOpen, editDesktop: false })}
                desktop={currentDesktop}
                employees={employees}
            ></EditDesktop>
            {currentDesktop && (
                <DeletionConfirmation
                    isOpen={formOpen.deleteDesktop}
                    handleClose={() => setFormOpen({ ...formOpen, deleteDesktop: false })}
                    deleteObject={currentDesktop}
                    type="DesktopPC"
                />
            )}
        </GuestLayout>
    );
};
export default Equipment;
