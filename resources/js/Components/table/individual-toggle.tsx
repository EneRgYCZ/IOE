import { QueryBuilderColumn } from "@/types";

import React, { useState } from "react";

import { FormControlLabel, Switch, Typography } from "@mui/material";

// Define the IndividualToggle component for toggling individual columns
const IndividualToggle = (props: {
    column: QueryBuilderColumn;
    columnToggledHandler: (column: QueryBuilderColumn, state: boolean) => void;
}) => {
    const [shown, setShown] = useState(!props.column.hidden); // State to track if the column is shown

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={shown} // Switch state based on whether the column is shown
                    onChange={e => {
                        setShown(e.target.checked); // Update state based on switch change
                        props.columnToggledHandler(props.column, !e.target.checked); // Call handler with new state
                    }}
                    color="primary" // Color of the switch
                />
            }
            label={
                <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
                    {/* Label for the column */}
                    {props.column.label}
                </Typography>
            }
            labelPlacement="start"
            sx={{
                justifyContent: "space-between", // Style for spacing
                width: "100%", // Full width
                margin: 0 // No margin
            }}
        />
    );
};

export default IndividualToggle;
