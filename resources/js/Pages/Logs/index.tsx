import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Logs } from "@/types";
import React from "react";
import { Card } from "@mui/material";
import { Table } from "@/Components/table/table";

const Log = ({ logs }: PageProps<{ logs: PaginatedResponse<Logs> }>) => {
    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<Logs> data={logs} />
            </Card>
        </GuestLayout>
    );
};

export default Log;
