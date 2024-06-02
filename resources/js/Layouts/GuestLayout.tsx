import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import NavigationBar from "@/Components/navigation/navigation-bar";
import Manager from "@/Components/toasts";

export default function GuestLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <>
            <NavigationBar />
            <Manager />
            <Box display="flex" justifyContent="center" maxWidth="100vw">
                {children}
            </Box>
        </>
    );
}
