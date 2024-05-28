import GuestLayout from "@/Layouts/GuestLayout";
import { MeetingRoomLaptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Button, Card, TableCell, Typography } from "@mui/material";
import { Table } from "@/Components/table/table";
import AddMeetingRoomLaptop from "@/Pages/Equipment/MeetingRoomLaptop/AddMeetingRoomLaptop";
import EditMeetingRoomLaptop from "@/Pages/Equipment/MeetingRoomLaptop/EditMeetingRoomLaptop";
import DeletionConfirmation from "@/Components/crud-forms/deletion-confirmation";
import { EditRounded, DeleteRounded } from "@mui/icons-material";
import AddButton from "@/Components/form-components/add-button";

const Equipment = ({
    meetingRoomLaptops
}: PageProps<{
    meetingRoomLaptops: PaginatedResponse<MeetingRoomLaptop>;
}>) => {
    const tableButtonMargins = {
        margin: "0 10px"
    };

    const [formOpen, setFormOpen] = React.useState({
        addMeetingRoomLaptop: false,
        editMeetingRoomLaptop: false,
        deleteMeetingRoomLaptop: false
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
                            data={meetingRoomLaptops}
                            actionRenderer={meetingRoomLaptop => (
                                <TableCell
                                    align="center"
                                    style={{ position: "sticky", right: 0, backgroundColor: "#fff" }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {/* Button for Edit */}
                                        <Button
                                            variant="outlined"
                                            sx={tableButtonMargins}
                                            onClick={() => {
                                                setCurrentMeetingRoomLaptop(meetingRoomLaptop);
                                                setFormOpen({ ...formOpen, editMeetingRoomLaptop: true });
                                            }}
                                        >
                                            EDIT
                                            <EditRounded sx={{ marginLeft: "10px" }} />
                                        </Button>

                                        {/* Button for Delete */}
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            sx={tableButtonMargins}
                                            onClick={() => {
                                                setCurrentMeetingRoomLaptop(meetingRoomLaptop);
                                                setFormOpen({ ...formOpen, deleteMeetingRoomLaptop: true });
                                            }}
                                        >
                                            <DeleteRounded />
                                        </Button>
                                    </Box>
                                </TableCell>
                            )}
                        />
                    </Box>
                </Box>
            </Card>

            {/* Button for Add */}
            <AddButton
                label="Add meeting room laptop"
                onClick={() => setFormOpen({ ...formOpen, addMeetingRoomLaptop: true })}
            />

            {/* Forms for Adding, Editing and Deleting */}
            <AddMeetingRoomLaptop
                isOpen={formOpen.addMeetingRoomLaptop}
                handleClose={() => setFormOpen({ ...formOpen, addMeetingRoomLaptop: false })}
            ></AddMeetingRoomLaptop>
            <EditMeetingRoomLaptop
                isOpen={formOpen.editMeetingRoomLaptop}
                handleClose={() => setFormOpen({ ...formOpen, editMeetingRoomLaptop: false })}
                meetingRoomLaptop={currentMeetingRoomLaptop}
            ></EditMeetingRoomLaptop>
            {currentMeetingRoomLaptop && (
                <DeletionConfirmation
                    isOpen={formOpen.deleteMeetingRoomLaptop}
                    handleClose={() => setFormOpen({ ...formOpen, deleteMeetingRoomLaptop: false })}
                    deleteObject={currentMeetingRoomLaptop}
                    type="MeetingRoomLaptop"
                />
            )}
        </GuestLayout>
    );
};
export default Equipment;
