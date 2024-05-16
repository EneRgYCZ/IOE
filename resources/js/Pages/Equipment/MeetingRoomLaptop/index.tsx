import GuestLayout from "@/Layouts/GuestLayout";
import { MeetingRoomLaptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, Fab, TableCell, Typography } from "@mui/material";
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
        addMeetingRoomLaptop: false,
        editMeetingRoomLaptop: false
    });

    const [currentMeetingRoomLaptop, setCurrentMeetingRoomLaptop] = React.useState<MeetingRoomLaptop | null>(null);

    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h4" sx={{ m: 2 }}>
                        Meeting Room Laptops
                    </Typography>
                </Box>
                <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box sx={{ width: "100%", alignItems: "center" }}>
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
                    </Box>
                </Box>
            </Card>
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
