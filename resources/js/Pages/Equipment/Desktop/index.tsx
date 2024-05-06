import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, Employee, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import { Link } from "@inertiajs/react";
import AddDesktop from "@/Pages/Equipment/Desktop/AddDesktop";
import EditDesktop from "@/Pages/Equipment/Desktop/EditDesktop";

const Equipment = ({
    desktops,
    employees
}: PageProps<{
    desktops: PaginatedResponse<DesktopPC>;
    employees: PaginatedResponse<Employee>;
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
                                    <Link
                                        href={route("equipment.destroyDesktop", desktop.id)}
                                        method="delete"
                                        onBefore={() =>
                                            window.confirm(
                                                "Are you sure that you want to eliminate this piece of equipment?"
                                            )
                                        }
                                    >
                                        <Button variant="contained" color="error">
                                            DELETE
                                        </Button>
                                    </Link>
                                </TableCell>
                            )}
                        />
                    </Box>
                </Box>
            </Card>
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
                employees={employees.data}
            ></AddDesktop>

            <EditDesktop
                isOpen={formOpen.editDesktop}
                handleClose={() => setFormOpen({ ...formOpen, editDesktop: false })}
                desktop={currentDesktop}
                employees={employees.data}
            ></EditDesktop>
        </GuestLayout>
    );
};
export default Equipment;
