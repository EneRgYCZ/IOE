import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, Laptop, MeetingRoomLaptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { Link } from "@inertiajs/react";
import AddDesktop from "@/Pages/Equipment/AddDesktop";

const Equipment = ({
                       desktops,
                       laptops,
                       meetingRoomLaptops
                   }: PageProps<{
    desktops: PaginatedResponse<DesktopPC>;
    laptops: PaginatedResponse<Laptop>;
    meetingRoomLaptops: PaginatedResponse<MeetingRoomLaptop>;
}>) => {
    const tableButtonMargins = {
        margin: "0 10px"
    };

    const addButtonStyle = {
        position: "fixed",
        bottom: 16,
        right: 16
    };

    const [formOpen, setFormOpen] = React.useState(false);

    return (
        <GuestLayout>
            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Card variant="outlined" sx={{ width: "70%", alignItems: "center", marginBottom: "30px" }}>
                    <Table<DesktopPC>
                        name="desktops"
                        data={desktops}
                        actionRenderer={desktop => (
                            <TableCell align="center">
                                <Button variant="contained" sx={tableButtonMargins}>
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
                <Card variant="outlined" sx={{ width: "70%", alignItems: "center", marginBottom: "30px" }}>
                    <Table<Laptop>
                        name="laptops"
                        data={laptops}
                        actionRenderer={laptop => (
                            <TableCell align="center">
                                <Button variant="contained" sx={tableButtonMargins}>
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
                <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                    <Table<MeetingRoomLaptop>
                        name="meetingRoomLaptops"
                        data={meetingRoomLaptops}
                        actionRenderer={meetingRoomLaptop => (
                            <TableCell align="center">
                                <Button variant="contained" sx={tableButtonMargins}>
                                    EDIT
                                </Button>
                                <Link
                                    href={route("equipment.destroyMeetingRoomLaptop", meetingRoomLaptop.id)}
                                    method="delete"
                                >
                                    <Button variant="contained" color="error">
                                        DELETE
                                    </Button>
                                </Link>
                            </TableCell>
                        )}
                    />
                </Card>
            </Box>
            <Fab variant="extended" color="primary" sx={addButtonStyle} onClick={() => setFormOpen(true)}>
                Add equipment
            </Fab>
            <AddDesktop isOpen={formOpen} handleClose={() => setFormOpen(false)}></AddDesktop>
        </GuestLayout>
    );
};
export default Equipment;
