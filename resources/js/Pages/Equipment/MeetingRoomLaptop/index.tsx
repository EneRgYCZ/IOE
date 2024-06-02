import GuestLayout from "@/Layouts/GuestLayout";
import { MeetingRoomLaptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import { Box, Card, TableCell, Typography } from "@mui/material";
import { CellRenderer, Table, defaultCellRenderer } from "@/Components/table/table";
import EquipmentModal from "@/Components/equipment-modal";
import DeletionConfirmation from "@/Components/crud-forms/deletion-confirmation";
import AddButton from "@/Components/form-components/add-button";
import dayjs from "dayjs";
import TableActions from "@/Components/table/table-actions";

const Equipment = ({
    meetingRoomLaptops
}: PageProps<{
    meetingRoomLaptops: PaginatedResponse<MeetingRoomLaptop>;
}>) => {
    const [formOpen, setFormOpen] = React.useState({
        addMeetingRoomLaptop: false,
        editMeetingRoomLaptop: false,
        deleteMeetingRoomLaptop: false
    });

    const [currentMeetingRoomLaptop, setCurrentMeetingRoomLaptop] = React.useState<MeetingRoomLaptop | null>(null);

    const customCellRenderer: CellRenderer<MeetingRoomLaptop> = (row, col, cellKey, rowIdx) => {
        if (col.key === "updated_at" || col.key === "created_at") {
            return (
                <TableCell
                    key={cellKey}
                    sx={{ pl: 2, maxHeight: "50px", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                    {dayjs(row[col.key]).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
            );
        }

        return defaultCellRenderer(row, col, cellKey, rowIdx);
    };

    const actionButtons = (meetingRoomLaptop: MeetingRoomLaptop): React.ReactElement => {
        return (
            <TableActions
                current={meetingRoomLaptop}
                setCurrent={setCurrentMeetingRoomLaptop}
                setEditFormOpen={() => {
                    setFormOpen({ ...formOpen, editMeetingRoomLaptop: true });
                }}
                setDeleteFormOpen={() => {
                    setFormOpen({ ...formOpen, deleteMeetingRoomLaptop: true });
                }}
            />
        );
    };

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
                            cellRenderer={customCellRenderer}
                            actionRenderer={actionButtons}
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
            <EquipmentModal
                isOpen={formOpen.addMeetingRoomLaptop}
                handleClose={() => setFormOpen({ ...formOpen, addMeetingRoomLaptop: false })}
                type="MeetingRoomLaptop"
            ></EquipmentModal>
            <EquipmentModal
                isOpen={formOpen.editMeetingRoomLaptop}
                handleClose={() => setFormOpen({ ...formOpen, editMeetingRoomLaptop: false })}
                equipment={currentMeetingRoomLaptop}
                type="MeetingRoomLaptop"
            ></EquipmentModal>
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
