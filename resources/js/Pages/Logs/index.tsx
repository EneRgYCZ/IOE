import GuestLayout from "@/Layouts/GuestLayout";
import {
    PageProps,
    PaginatedResponse,
    ActivityLog,
    Employee,
    Team,
    DesktopPC,
    Laptop,
    MeetingRoomLaptop,
    DeleteActivityLog
} from "@/types";
import React from "react";
import { Box, Card, TableCell, Typography } from "@mui/material";
import { CellRenderer, Table, defaultCellRenderer } from "@/Components/table/table";
import dayjs from "dayjs";

const Log = ({ logs }: PageProps<{ logs: PaginatedResponse<ActivityLog> }>) => {
    const deleteTypeGuard = (t: ActivityLog): t is DeleteActivityLog => {
        return t.event === "deleted";
    };

    const customCellRenderer: CellRenderer<ActivityLog> = (row, col, cellKey, rowIdx) => {
        if (col.key === "updated_at") {
            return <TableCell key={cellKey}>{dayjs(row.updated_at).format("YYYY-MM-DD HH:mm:ss")}</TableCell>;
        }
        if (col.key === "subject_type") {
            if (row.subject_type === "App\\Models\\Employee") {
                if (deleteTypeGuard(row)) {
                    const employee = row.properties.old as Employee;
                    return (
                        <TableCell key={cellKey}>
                            {"Employee: "}
                            {employee.first_name}
                        </TableCell>
                    );
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
                if (deleteTypeGuard(row)) {
                    const team = row.properties.old as Team;
                    return (
                        <TableCell key={cellKey}>
                            {"Team: "}
                            {team.team_name}
                        </TableCell>
                    );
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
                if (deleteTypeGuard(row)) {
                    const desktop = row.properties.old as DesktopPC;
                    return (
                        <TableCell key={cellKey}>
                            {"Desktop: "}
                            {desktop.full_number_identifier}
                        </TableCell>
                    );
                }
                const desktop = row.subject as DesktopPC;
                return (
                    <TableCell key={cellKey}>
                        {"Desktop: "}
                        {desktop.full_number_identifier}
                    </TableCell>
                );
            }
            if (row.subject_type === "App\\Models\\Laptop") {
                if (deleteTypeGuard(row)) {
                    const laptop = row.properties.old as Laptop;
                    return (
                        <TableCell key={cellKey}>
                            {"Laptop: "}
                            {laptop.full_number_identifier}
                        </TableCell>
                    );
                }
                const laptop = row.subject as Laptop;
                return (
                    <TableCell key={cellKey}>
                        {"Laptop: "}
                        {laptop.full_number_identifier}
                    </TableCell>
                );
            }
            if (row.subject_type === "App\\Models\\MeetingRoomLaptop") {
                if (deleteTypeGuard(row)) {
                    const meetingRoomLaptop = row.properties.old as MeetingRoomLaptop;
                    return (
                        <TableCell key={cellKey}>
                            {"MeetingRoomLaptop: "}
                            {meetingRoomLaptop.full_number_identifier}
                        </TableCell>
                    );
                }
                const MeetingRoomLaptop = row.subject as MeetingRoomLaptop;
                return (
                    <TableCell key={cellKey}>
                        {"Meeting Room Laptop: "} {MeetingRoomLaptop.full_number_identifier}
                    </TableCell>
                );
            }

            return <TableCell key={cellKey}>{row.subject_type}</TableCell>;
        }

        return defaultCellRenderer(row, col, cellKey, rowIdx);
    };

    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h4" sx={{ m: 2 }}>
                        Logs
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", alignItems: "center" }}>
                    <Table<ActivityLog> data={logs} cellRenderer={customCellRenderer} />
                </Box>
            </Card>
        </GuestLayout>
    );
};

export default Log;
