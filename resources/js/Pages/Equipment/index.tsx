import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, Laptop, MeetingRoomLaptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";
import {Button, Card, Fab, TableCell} from "@mui/material";
import Table from "@/Components/table/table";

const Equipment = ({
    desktops,
    laptops,
    meetingRoomLaptops
}: PageProps<{
    desktops: PaginatedResponse<DesktopPC>;
    laptops: PaginatedResponse<Laptop>;
    meetingRoomLaptops: PaginatedResponse<MeetingRoomLaptop>;
}>) => {
    console.log(desktops);
    console.log(laptops);
    console.log(meetingRoomLaptops);

    const tableButtonMargins = {
        margin: "0 10px"
    };

    const addButtonStyle = {
        position: "fixed",
        bottom: 16,
        right: 16
    };

    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<DesktopPC>
                    data={desktops}
                    actionRenderer={() => (
                        <TableCell align="center">
                            <Button variant="contained" sx={tableButtonMargins}>
                                EDIT
                            </Button>
                            <Button variant="contained" color="error">
                                DELETE
                            </Button>
                        </TableCell>
                    )}
                />
            </Card>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<Laptop>
                    data={laptops}
                    actionRenderer={() => (
                        <TableCell align="center">
                            <Button variant="contained" sx={tableButtonMargins}>
                                EDIT
                            </Button>
                            <Button variant="contained" color="error">
                                DELETE
                            </Button>
                        </TableCell>
                    )}
                />
            </Card>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<MeetingRoomLaptop>
                    data={meetingRoomLaptops}
                    actionRenderer={() => (
                        <TableCell align="center">
                            <Button variant="contained" sx={tableButtonMargins}>
                                EDIT
                            </Button>
                            <Button variant="contained" color="error">
                                DELETE
                            </Button>
                        </TableCell>
                    )}
                />
            </Card>
            <Fab variant="extended" color="primary" sx={addButtonStyle}>
                Add equipment
            </Fab>
        </GuestLayout>
    );
};
export default Equipment;
