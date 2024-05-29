import React from "react";
import { Box} from "@mui/material";

const ErrorBox = (props: {
    field: string
    hasErrors: boolean;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    errors: Partial<Record<keyof any, string>>;
}) => {
    console.log(props.errors);

    return props.hasErrors ? (
        <Box sx={{ color: "#c62828" }}>
            {props.errors[props.field] && (
                <p style={{ margin: "10px 0" }}>
                    {props.errors[props.field]}
                </p>
            )}
        </Box>
    ) : (
        <></>
    );
};
export default ErrorBox;
