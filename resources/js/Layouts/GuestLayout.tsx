import React, { PropsWithChildren } from "react";

import { Box } from "@mui/material";
import NavigationBar from "@/Components/navigation/navigation-bar";

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Box sx={{ width: "100%", marginBottom: "40px" }}>
                <NavigationBar />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" maxWidth="100vw">
                {children}
            </Box>
        </>
    );
}
