import GuestLayout from "@/Layouts/GuestLayout";
import { DesktopPC, Laptop, MeetingRoomLaptop, PageProps, PaginatedResponse } from "@/types";
import React from "react";

const Index = ({
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

    return (
        <GuestLayout>
            <h1>Equipment</h1>
        </GuestLayout>
    );
};

export default Index;
