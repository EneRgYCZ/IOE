import GuestLayout from "@/Layouts/GuestLayout";
import { Laptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { Link } from "@inertiajs/react";
import AddLaptop from "@/Pages/Equipment/Laptop/AddLaptop";
import EditLaptop from "@/Pages/Equipment/Laptop/EditLaptop";

const Equipment = ({
    laptops
}: PageProps<{
    laptops: PaginatedResponse<Laptop>;
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
        addLaptop: false,
        addMeetingRoomLaptop: false,
        editDesktop: false,
        editLaptop: false,
        editMeetingRoomLaptop: false
    });

    const [currentLaptop, setCurrentLaptop] = React.useState<Laptop | null>(null);

    return (
        <GuestLayout>
            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Card variant="outlined" sx={{ width: "90%", alignItems: "center", marginBottom: "30px" }}>
                    <Table<Laptop>
                        name="laptops"
                        data={laptops}
                        actionRenderer={laptop => (
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    sx={tableButtonMargins}
                                    onClick={() => {
                                        setCurrentLaptop(laptop);
                                        setFormOpen({ ...formOpen, editLaptop: true });
                                    }}
                                >
                                    EDIT
                                </Button>
                                <Link href={route("equipment.destroyLaptop", laptop.id)} method="delete">
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
                    onClick={() => setFormOpen({ ...formOpen, addLaptop: true })}
                >
                    Add laptop
                </Fab>
            </Box>
            <AddLaptop
                isOpen={formOpen.addLaptop}
                handleClose={() => setFormOpen({ ...formOpen, addLaptop: false })}
            ></AddLaptop>
            <EditLaptop
                isOpen={formOpen.editLaptop}
                handleClose={() => setFormOpen({ ...formOpen, editLaptop: false })}
                laptop={currentLaptop}
            ></EditLaptop>
        </GuestLayout>
    );
};
export default Equipment;
