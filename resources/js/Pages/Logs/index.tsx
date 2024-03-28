import GuestLayout from "@/Layouts/GuestLayout";
import { Logs, PageProps, PaginatedResponse } from "@/types";
import React from "react";

const Index = ({ logs }: PageProps<{ logs: PaginatedResponse<Logs> }>) => {
    console.log(logs);

    return (
        <GuestLayout>
            <Card variant="outlined" sx={{ width: "70%", alignItems: "center" }}>
                <Table<Logs>
                    data={logs}
                />
            </Card>
        </GuestLayout>
    );
};

export default Index;
