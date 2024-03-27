import GuestLayout from "@/Layouts/GuestLayout";
import { Logs, PageProps, PaginatedResponse } from "@/types";
import React from "react";

const Index = ({ logs }: PageProps<{ logs: PaginatedResponse<Logs> }>) => {
    console.log(logs);

    return (
        <GuestLayout>
            <h1>Logs</h1>
        </GuestLayout>
    );
};

export default Index;
