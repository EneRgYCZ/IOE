import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { Link } from "@inertiajs/react";
import AddDesktop from "@/Pages/Equipment/Desktop/AddDesktop";
import EditDesktop from "@/Pages/Equipment/Desktop/EditDesktop";

const Equipment = ({
    desktops
}: PageProps<{
    desktops: PaginatedResponse<DesktopPC>;
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
        editDesktop: false
    });

    const [currentDesktop, setCurrentDesktop] = React.useState<DesktopPC | null>(null);

    return (
        <GuestLayout>
            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Card variant="outlined" sx={{ width: "90%", alignItems: "center", marginBottom: "30px" }}>
                    <Table<DesktopPC>
                        name="desktops"
                        data={desktops}
                        actionRenderer={desktop => (
                            <TableCell align="center">
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
                                <Link href={route("equipment.destroyDesktop", desktop.id)} method="delete">
                                    <Button variant="contained" color="error">
                                        DELETE
                                    </Button>
                                </Link>
                            </TableCell>
                        )}
                    />
                </Card>
            </Box>
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
            <AddDesktop
                isOpen={formOpen.addDesktop}
                handleClose={() => setFormOpen({ ...formOpen, addDesktop: false })}
            ></AddDesktop>

            <EditDesktop
                isOpen={formOpen.editDesktop}
                handleClose={() => setFormOpen({ ...formOpen, editDesktop: false })}
                desktop={currentDesktop}
            ></EditDesktop>
        </GuestLayout>
    );
};
export default Equipment;
