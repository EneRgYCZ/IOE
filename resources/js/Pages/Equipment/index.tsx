import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, Laptop, MeetingRoomLaptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { Link } from "@inertiajs/react";
import AddDesktop from "@/Pages/Equipment/AddDesktop";
import AddLaptop from "@/Pages/Equipment/AddLaptop";
import AddMeetingRoomLaptop from "@/Pages/Equipment/AddMeetingRoomLaptop";
import EditDesktop from "@/Pages/Equipment/EditDesktop";
import EditLaptop from "@/Pages/Equipment/EditLaptop";
import EditMeetingRoomLaptop from "@/Pages/Equipment/EditMeetingRoomLaptop";

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

    const [currentDesktop, setCurrentDesktop] = React.useState<DesktopPC | null>(null);
    const [currentLaptop, setCurrentLaptop] = React.useState<Laptop | null>(null);
    const [currentMeetingRoomLaptop, setCurrentMeetingRoomLaptop] = React.useState<MeetingRoomLaptop | null>(null);

    return (
        <GuestLayout>
            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Card variant="outlined" sx={{ width: "70%", alignItems: "center", marginBottom: "30px" }}>
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
                </Card>
                <Card variant="outlined" sx={{ width: "70%", alignItems: "center", marginBottom: "30px" }}>
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
                                <Link
                                    href={route("equipment.destroyLaptop", laptop.id)}
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
                </Card>
                <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                    <Table<MeetingRoomLaptop>
                        name="meetingRoomLaptops"
                        data={meetingRoomLaptops}
                        actionRenderer={meetingRoomLaptop => (
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    sx={tableButtonMargins}
                                    onClick={() => {
                                        setCurrentMeetingRoomLaptop(meetingRoomLaptop);
                                        setFormOpen({ ...formOpen, editMeetingRoomLaptop: true });
                                    }}
                                >
                                    EDIT
                                </Button>
                                <Link
                                    href={route("equipment.destroyMeetingRoomLaptop", meetingRoomLaptop.id)}
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
            <EditDesktop
                isOpen={formOpen.editDesktop}
                handleClose={() => setFormOpen({ ...formOpen, editDesktop: false })}
                desktop={currentDesktop}
            ></EditDesktop>
            <EditLaptop
                isOpen={formOpen.editLaptop}
                handleClose={() => setFormOpen({ ...formOpen, editLaptop: false })}
                laptop={currentLaptop}
            ></EditLaptop>
            <EditMeetingRoomLaptop
                isOpen={formOpen.editMeetingRoomLaptop}
                handleClose={() => setFormOpen({ ...formOpen, editMeetingRoomLaptop: false })}
                meetingRoomLaptop={currentMeetingRoomLaptop}
            ></EditMeetingRoomLaptop>
        </GuestLayout>
    );
};
export default Equipment;
