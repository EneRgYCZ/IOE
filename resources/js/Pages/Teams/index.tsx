import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, PaginatedResponse, Team } from "@/types";
import React from "react";

const Teams = ({ teams }: PageProps<{ teams: PaginatedResponse<Team> }>) => {
    console.log(teams);

    return (
        <GuestLayout>
            <h1>Teams</h1>
        </GuestLayout>
    );
};

export default Teams;
