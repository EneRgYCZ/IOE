import React, { PropsWithChildren } from "react";

import { Box } from "@mui/material";
import NavigationBar from "@/Components/navigation/navigation-bar";
import Manager from "@/Components/toasts";


export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <>
            <NavigationBar />
            <Manager />
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" maxWidth="100vw">
                {children}
            </Box>
        </>
    );
}
