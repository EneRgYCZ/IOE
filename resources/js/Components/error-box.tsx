import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorBox = (props: {
    hasErrors: boolean;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    errors: Partial<Record<keyof any, string>>;
    clearErrors: () => void;
}) => {
    return props.hasErrors ? (
        <Box sx={{ color: "#c62828", padding: "6px 0" }}>
            <Typography sx={{ margin: "10px 0", display: "flex" }} variant="h6">
                Errors
            </Typography>

            {Object.values(props.errors).map((error, index) => (
                <p key={"error_" + index} style={{ margin: "10px 0" }}>
                    {error}
                </p>
            ))}
        </Box>
    ) : (
        <></>
    );
};
export default ErrorBox;
