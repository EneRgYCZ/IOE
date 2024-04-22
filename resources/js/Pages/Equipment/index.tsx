import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, Laptop, MeetingRoomLaptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { Link } from "@inertiajs/react";
import AddDesktop from "@/Pages/Equipment/AddDesktop";
import AddLaptop from "@/Pages/Equipment/AddLaptop";
import AddMeetingRoomLaptop from "@/Pages/Equipment/AddMeetingRoomLaptop";

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

    const addButtonBox = {
        position: "fixed",
        width: "250px",
        bottom: 16,
        right: 16
    };

    const addButtonStyle = {
        display: "block",
        marginTop: "16px",
        marginLeft: "auto"
    };

    const [formOpen, setFormOpen] = React.useState({
        addDesktop: false,
        addLaptop: false,
        addMeetingRoomLaptop: false
    });

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
            <Box sx={addButtonBox}>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={addButtonStyle}
                    onClick={() => setFormOpen({ ...formOpen, addDesktop: true })}
                >
                    Add desktop
                </Fab>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={addButtonStyle}
                    onClick={() => setFormOpen({ ...formOpen, addLaptop: true })}
                >
                    Add laptop
                </Fab>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={addButtonStyle}
                    onClick={() => setFormOpen({ ...formOpen, addMeetingRoomLaptop: true })}
                >
                    Add meeting room laptop
                </Fab>
            </Box>
            <AddDesktop
                isOpen={formOpen.addDesktop}
                handleClose={() => setFormOpen({ ...formOpen, addDesktop: false })}
            ></AddDesktop>
            <AddLaptop
                isOpen={formOpen.addLaptop}
                handleClose={() => setFormOpen({ ...formOpen, addLaptop: false })}
            ></AddLaptop>
            <AddMeetingRoomLaptop
                isOpen={formOpen.addMeetingRoomLaptop}
                handleClose={() => setFormOpen({ ...formOpen, addMeetingRoomLaptop: false })}
            ></AddMeetingRoomLaptop>
        </GuestLayout>
    );
};
export default Equipment;
