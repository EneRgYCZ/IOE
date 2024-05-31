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
    DeleteActivityLog,
    UpdateActivityLog,
    TeamMember
} from "@/types";
import React, { useState } from "react";
import { Box, Button, Card, Modal, Stack, TableCell, Typography } from "@mui/material";
import { CellRenderer, Table, defaultCellRenderer } from "@/Components/table/table";
import dayjs from "dayjs";

const Log = ({ logs }: PageProps<{ logs: PaginatedResponse<ActivityLog> }>) => {
    const deleteTypeGuard = (t: ActivityLog): t is DeleteActivityLog => {
        return t.event === "deleted";
    };

    const updateTypeGuard = (t: ActivityLog): t is UpdateActivityLog => {
        return t.event === "updated";
    };

    const [openModal, setOpenModal] = useState(false);
    const [diffData, setDiffData] = useState<Array<{ attribute: string; oldValue: unknown; newValue: unknown }>>([]);

    function flattenObject(obj: Record<string, unknown>, prefix = "") {
        return Object.keys(obj).reduce(
            (acc, k) => {
                const pre = prefix.length ? prefix + "." : "";
                if (obj[k] !== null && typeof obj[k] === "object")
                    Object.assign(acc, flattenObject(obj[k] as Record<string, unknown>, pre + k));
                else acc[pre + k] = obj[k];
                return acc;
            },
            {} as Record<string, unknown>
        );
    }

    const customCellRenderer: CellRenderer<ActivityLog> = (row, col, cellKey, rowIdx) => {
        const renderSubjectType = (type: string) => {
            const wasDeletedOrUpdated = deleteTypeGuard(row) || updateTypeGuard(row);

            switch (type) {
                case "App\\Models\\Employee": {
                    const employee = wasDeletedOrUpdated
                        ? (row.properties.old as Employee)
                        : (row.properties.attributes as Employee);
                    return (
                        <TableCell key={cellKey}>
                            {"Employee: "}
                            {employee.first_name}
                        </TableCell>
                    );
                }
                case "App\\Models\\Team": {
                    const team = wasDeletedOrUpdated
                        ? (row.properties.old as Team)
                        : (row.properties.attributes as Team);
                    return (
                        <TableCell key={cellKey}>
                            {"Team: "}
                            {team.team_name}
                        </TableCell>
                    );
                }
                case "App\\Models\\Desktop": {
                    const desktop = wasDeletedOrUpdated
                        ? (row.properties.old as DesktopPC)
                        : (row.properties.attributes as DesktopPC);
                    return (
                        <TableCell key={cellKey}>
                            {"Desktop: "}
                            {desktop.full_number_identifier}
                        </TableCell>
                    );
                }
                case "App\\Models\\Laptop": {
                    const laptop = wasDeletedOrUpdated
                        ? (row.properties.old as Laptop)
                        : (row.properties.attributes as Laptop);
                    return (
                        <TableCell key={cellKey}>
                            {"Laptop: "}
                            {laptop.full_number_identifier}
                        </TableCell>
                    );
                }
                case "App\\Models\\MeetingRoomLaptop": {
                    const meetingRoomLaptop = wasDeletedOrUpdated
                        ? (row.properties.old as MeetingRoomLaptop)
                        : (row.properties.attributes as MeetingRoomLaptop);
                    return (
                        <TableCell key={cellKey}>
                            {"Meeting Room Laptop: "} {meetingRoomLaptop.full_number_identifier}
                        </TableCell>
                    );
                }
                case "App\\Models\\TeamMember": {
                    if (deleteTypeGuard(row)) {
                        const teamMember = row.properties.old as TeamMember;
                        return (
                            <TableCell key={cellKey}>
                                {"Employee: "}
                                {teamMember.employee?.first_name}
                                {" was removed from the team: "}
                                {teamMember.team?.team_name}
                            </TableCell>
                        );
                    }
                    const teamMember = row.properties.attributes as TeamMember;
                    return (
                        <TableCell key={cellKey}>
                            {"Employee: "}
                            {teamMember.employee?.first_name}
                            {" was added to the team: "}
                            {teamMember.team?.team_name}
                        </TableCell>
                    );
                }
                default:
                    return <TableCell key={cellKey}>{row.subject_type}</TableCell>;
            }
        };

        switch (col.key) {
            case "event":
                if (row.subject_type === "App\\Models\\TeamMember" && row.event === "created") {
                    return <TableCell>added</TableCell>;
                }
                if (row.subject_type === "App\\Models\\TeamMember" && row.event === "deleted") {
                    return <TableCell>removed</TableCell>;
                }
                break;
            case "properties":
                if (row.event === "updated" && updateTypeGuard(row)) {
                    const newAttributes = flattenObject(row.properties.attributes);
                    const oldAttributes = flattenObject(row.properties.old);

                    const handleOpenModal = () => {
                        const data = Object.entries(newAttributes)
                            .map(([attribute, newValue]) => {
                                const oldValue = oldAttributes[attribute];
                                if (oldValue === newValue) {
                                    return null;
                                }
                                return {
                                    attribute,
                                    oldValue,
                                    newValue
                                };
                            })
                            .filter(Boolean) as { attribute: string; oldValue: unknown; newValue: unknown }[];
                        setDiffData(data);
                        setOpenModal(true);
                    };

                    return (
                        <TableCell key={cellKey} align="center">
                            <Button size="small" onClick={handleOpenModal}>
                                Show Changes
                            </Button>
                            <Modal
                                open={openModal}
                                onClose={() => setOpenModal(false)}
                                aria-labelledby="modal-title"
                                aria-describedby="modal-desc"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Card
                                    sx={{
                                        p: 2,
                                        width: "30%",
                                        display: "flex",
                                        boxShadow: "lg",
                                        maxHeight: "70%",
                                        borderRadius: "md",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            overflowY: "auto",
                                            p: 2,
                                            pt: 6
                                        }}
                                    >
                                        <TransposedTable data={diffData} />
                                    </Box>
                                </Card>
                            </Modal>
                        </TableCell>
                    );
                }
                break;
            case "updated_at":
                return <TableCell key={cellKey}>{dayjs(row.updated_at).format("YYYY-MM-DD HH:mm:ss")}</TableCell>;
            case "subject_type":
                return renderSubjectType(row.subject_type);
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

type TransposedTableProps = {
    data: { attribute: string; oldValue: unknown; newValue: unknown }[];
};

const TransposedTable: React.FC<TransposedTableProps> = ({ data }) => {
    const getLabel = (key: string) => {
        switch (key) {
            case "attribute":
                return "Attribute";
            case "oldValue":
                return "Old Value";
            case "newValue":
                return "New Value";
            default:
                return key;
        }
    };

    const getValueStyle = (key: string) => {
        let color = "inherit";
        if (key === "oldValue") {
            color = "red";
        } else if (key === "newValue") {
            color = "green";
        }

        return {
            width: "60%",
            textAlign: "right",
            color: color
        };
    };

    const filteredData = data.filter(item => item.newValue !== null && item.attribute !== "updated_at");

    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Changes
            </Typography>
            {filteredData.map((item, index) => (
                <Card key={"log_card_" + index} variant="outlined" sx={{ mb: 5, overflow: "auto" }}>
                    <Stack gap={2} sx={{ m: 3 }}>
                        {Object.entries(item).map(([key, value], valueIndex) => (
                            <Stack
                                key={"log_" + valueIndex}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-end"
                            >
                                <Typography sx={{ width: "30%", fontWeight: "lg" }}>{getLabel(key)}</Typography>
                                <Typography sx={getValueStyle(key)}>
                                    {typeof value === "object" ? JSON.stringify(value) : String(value)}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Card>
            ))}
        </>
    );
};

export default Log;
