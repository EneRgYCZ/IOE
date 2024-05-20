import React from "react";
import { Box, Button, Typography } from "@mui/material";

const ErrorBox = (props: {
    hasErrors: boolean;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    errors: Partial<Record<keyof any, string>>;
    clearErrors: () => void;
}) => {
    return props.hasErrors ? (
        <Box sx={{ backgroundColor: "#ff8c8c", padding: "6px 6px" }}>
            <Typography sx={{ margin: "10px", display: "flex" }} variant="h5">
                Errors
                <Button onClick={() => props.clearErrors()} variant={"outlined"} sx={{ marginLeft: "auto" }}>
                    Clear
                </Button>
            </Typography>

            {Object.values(props.errors).map((error, index) => (
                <p key={"error_" + index} style={{ margin: "10px" }}>
                    {error}
                </p>
            ))}
        </Box>
    ) : (
        <></>
    );
};
export default ErrorBox;
