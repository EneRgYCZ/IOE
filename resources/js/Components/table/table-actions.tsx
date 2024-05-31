import { DesktopPC, Employee, Laptop, MeetingRoomLaptop, Team } from "@/types";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { Box, Button, TableCell } from "@mui/material";
import React from "react";

const TableActions = <T extends DesktopPC | Laptop | MeetingRoomLaptop | Team | Employee | null>(props: {
    current: T;
    setCurrent: (value: T) => void;
    setEditFormOpen: () => void;
    setDeleteFormOpen: () => void;
}) => {
    const tableButtonMargins = {
        margin: "0 10px"
    };

    return (
        <TableCell align="center" style={{ position: "sticky", right: 0, backgroundColor: "#fff" }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* Button for Edit */}
                <Button
                    variant="outlined"
                    sx={tableButtonMargins}
                    onClick={() => {
                        props.setCurrent(props.current);
                        props.setEditFormOpen();
                    }}
                >
                    VIEW & EDIT
                    <EditRounded sx={{ marginLeft: "10px" }} />
                </Button>

                {/* Button for Delete */}
                <Button
                    variant="outlined"
                    sx={tableButtonMargins}
                    color="error"
                    onClick={() => {
                        props.setCurrent(props.current);
                        props.setDeleteFormOpen();
                    }}
                >
                    <DeleteRounded />
                </Button>
            </Box>
        </TableCell>
    );
};

export default TableActions;
