import GuestLayout from "@/Layouts/GuestLayout";
import { MeetingRoomLaptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell } from "@mui/material";
import { Table } from "@/Components/table/table";
import { Link } from "@inertiajs/react";
import AddMeetingRoomLaptop from "@/Pages/Equipment/MeetingRoomLaptop/AddMeetingRoomLaptop";
import EditMeetingRoomLaptop from "@/Pages/Equipment/MeetingRoomLaptop/EditMeetingRoomLaptop";

const Equipment = ({
    meetingRoomLaptops
}: PageProps<{
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

    const [currentMeetingRoomLaptop, setCurrentMeetingRoomLaptop] = React.useState<MeetingRoomLaptop | null>(null);

    return (
        <GuestLayout>
            <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Card variant="outlined" sx={{ width: "90%", alignItems: "center" }}>
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
                    onClick={() => setFormOpen({ ...formOpen, addMeetingRoomLaptop: true })}
                >
                    Add meeting room laptop
                </Fab>
            </Box>

            <AddMeetingRoomLaptop
                isOpen={formOpen.addMeetingRoomLaptop}
                handleClose={() => setFormOpen({ ...formOpen, addMeetingRoomLaptop: false })}
            ></AddMeetingRoomLaptop>
            <EditMeetingRoomLaptop
                isOpen={formOpen.editMeetingRoomLaptop}
                handleClose={() => setFormOpen({ ...formOpen, editMeetingRoomLaptop: false })}
                meetingRoomLaptop={currentMeetingRoomLaptop}
            ></EditMeetingRoomLaptop>
        </GuestLayout>
    );
};
export default Equipment;
