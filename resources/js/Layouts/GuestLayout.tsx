import React, { PropsWithChildren } from "react";

import { Box } from "@mui/material";

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" maxWidth="100vw">
            {children}
        </Box>
    );
}
