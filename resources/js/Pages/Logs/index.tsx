import GuestLayout from "@/Layouts/GuestLayout";
import {
    PageProps,
    PaginatedResponse,
    ActivityLog,
    Employee,
    Team,
    DesktopPC,
    Laptop,
    MeetingRoomLaptop
} from "@/types";
import React from "react";
import { Card, TableCell } from "@mui/material";
import { CellRenderer, Table, defaultCellRenderer } from "@/Components/table/table";

const Log = ({ logs }: PageProps<{ logs: PaginatedResponse<ActivityLog> }>) => {
    const customCellRenderer: CellRenderer<ActivityLog> = (row, col, cellKey, rowIdx) => {
        if (col.key === "subject_type") {
            if (row.subject_type === "App\\Models\\Employee") {
                if (row.subject === null) {
                    return <TableCell key={cellKey}>Deleted</TableCell>;
                }
                const employee = row.subject as Employee;
                return (
                    <TableCell key={cellKey}>
                        {"Employee: "}
                        {employee.first_name}
                    </TableCell>
                );
            }
            if (row.subject_type === "App\\Models\\Team") {
                if (row.subject === null) {
                    return <TableCell key={cellKey}>Deleted</TableCell>;
                }
                const team = row.subject as Team;
                return (
                    <TableCell key={cellKey}>
                        {"Team: "}
                        {team.team_name}
                    </TableCell>
                );
            }
            if (row.subject_type === "App\\Models\\Desktop") {
                if (row.subject === null) {
                    return <TableCell key={cellKey}>Deleted</TableCell>;
                }
                const desktop = row.subject as DesktopPC;
                return (
                    <TableCell key={cellKey}>
                        {"Desktop: "}
                        {desktop.serial_number}
                    </TableCell>
                );
            }
            if (row.subject_type === "App\\Models\\Laptop") {
                if (row.subject === null) {
                    return <TableCell key={cellKey}>Deleted</TableCell>;
                }
                const laptop = row.subject as Laptop;
                return (
                    <TableCell key={cellKey}>
                        {"Laptop: "}
                        {laptop.serial_number}
                    </TableCell>
                );
            }
            if (row.subject_type === "App\\Models\\MeetingRoomLaptop") {
                if (row.subject === null) {
                    return <TableCell key={cellKey}>Deleted</TableCell>;
                }
                const MeetingRoomLaptop = row.subject as MeetingRoomLaptop;
                return (
                    <TableCell key={cellKey}>
                        {"Meeting Room Laptop: "} {MeetingRoomLaptop.serial_number}
                    </TableCell>
                );
            }
            return <TableCell key={cellKey}>{row.subject_type}</TableCell>;
        }

        return defaultCellRenderer(row, col, cellKey, rowIdx);
    };

    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<ActivityLog> data={logs} cellRenderer={customCellRenderer} />
            </Card>
        </GuestLayout>
    );
};

export default Log;
